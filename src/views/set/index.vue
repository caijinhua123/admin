<template>
  <div class="app-container">
    <div style="margin-bottom:40px;margin-top:10px">
    <h2>请设置信息</h2>
    </div>
    <h3>网站标题</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入网站标题" v-model="form.siteTitle" ></el-input>
    </div>
    <h3>邮箱</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入邮箱地址" v-model="form.mail" ></el-input>
    </div>
    <h3>网站备案号</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入网站备案号" v-model="form.icp" ></el-input>
    </div>
    <h3>博主照片地址</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
     <Upload :imgUrl="form.avatar" @upload="uploadavatar" />
    </div>
    <h3>网站图标</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入网站图标" v-model="form.favicon" ></el-input>
    </div>
    <h3>github名称</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入github名称" v-model="form.githubName" ></el-input>
    </div>
    <h3>github主页</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入github主页" v-model="form.github" ></el-input>
    </div>
    <h3>QQ</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入QQ" v-model="form.qq" ></el-input>
    </div>
    <h3>WX</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入WX" v-model="form.weixin" ></el-input>
    </div>
    <h3>QQ二维码</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
     <Upload :imgUrl="form.qqQrCode" @upload="uploadQQ" />
    </div>
    <h3>WX二维码</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
     <Upload :imgUrl="form.weixinQrCode" @upload="uploadWX" />
    </div>

    <div style="margin-bottom:20px;margin-top:20px">
    <el-button type="primary" @click="onSubmit" >确认修改</el-button>
  </div>
  </div>
</template>

<script>
import {getset,set} from '@/api/set'
import Upload from "@/components/upload"
export default {
  components:{
    Upload
  },
  props:{
      projectdata:{}
  },
  data(){
    return {
      form:{},
    }
  },
  async created(){
     this.form = await getset()
     this.form = this.form.data 
  },
  methods:{
  onSubmit(){
        set(this.form).then((result) => {
      this.$emit('submit',false)
       this.$message({
                        type: 'success',
                        message: '修改成功!'
        });

    }).catch((err) => {
      this.$message({
                        type: 'warning',
                        message: '修改失败!'
                    });
    });
    
  },
  uploadavatar(res){
    this.form.avatar = res.data
  },
  uploadQQ(res){
    this.form.qqQrCode = res.data
  },
  uploadWX(res){
    this.form.weixinQrCode = res.data
  }
  }
}
</script>

<style>

</style>