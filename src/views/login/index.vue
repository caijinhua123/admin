<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">个人空间后台系统</h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入管理员账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入管理员密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <div class="captcha">
        <el-form-item prop="captcha" class="captchaText">
        <span class="svg-container">
          <svg-icon icon-class="nested" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          name="captcha"
          type="text"
          tabindex="3"
          auto-complete="on"
          maxlength='4'
        />
      </el-form-item>
      <div class="captchaImg" v-html="captchaImg" @click="getcaptchaImg">
        
      </div>
      </div>
      
      <!-- 七天免登陆 -->
       <el-checkbox v-model="checked" class="checked">七天免登陆</el-checkbox>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import {getcaptcha} from '@/api/login'
export default {
  name: 'Login',
  data() {
    //验证器
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入管理员账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if(value.length === 0){
        callback(new Error('请输入管理员密码'))
      }else if (value.length < 6) {
        callback(new Error('请输入完整管理员密码'))
      } else {
        callback()
      }
    }
    const validatecaptcha = (rule, value, callback) => {
      if (value.length < 4 ||value.length > 4) {
        callback(new Error('请重新输入验证码'))
      }else if(value.length === 0){
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      error:false,
      captchaImg:'',
      checked: true,
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha:'',
        remember:'',
      },
      
      loginRules: {
        //字段验证规则
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validatecaptcha }],
        remember:this.checked?7:0 //七天免登陆
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created(){
     this.captchaImg=  this.getcaptchaImg()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    async getcaptchaImg(){
      //获取验证码
       this.captchaImg= await getcaptcha()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if(this.checked){
          this.loginForm.remember =7
        }else{
          this.loginForm.remember =''
        }
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log('验证成功',this.redirect);
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((err) => {
            console.log(typeof err);
            if(typeof err=='string'){
              this.$message.error('验证码错误');
            }else if(typeof err=='object'){
              this.$message.error('账号或密码错误');
            }
            this.loading = false
          })
        } else {
          alert('请验证信息是否填写完整')
          // console.log('error submit!!')
          return false
        }
      })
      //验证码刷新
      this.getcaptchaImg()
      this.loginForm.captcha=''
    }
  }
}
</script>
<style scoped>
.captcha{
  display: flex;
}
.captchaImg{
  width: 150px;
  height: 54px;
  border: 1px solid ;
  margin-left: 10px;
  border-color: rgba(255, 255, 255, 0.1);
  background-color:#283443 ;
  border-radius: 5px;
}
.captchaText{
  width: 70%;
}
.checked{
  margin-bottom: 20px;
}
</style>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
