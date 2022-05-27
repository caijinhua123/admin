<template>
<el-upload
  class="avatar-uploader"
  action="/api/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :headers="headers"
  >
  <img v-if="imgUrl" :src="imgurlconfig+imgUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

</template>

<script>
import ImgUrlconfig from '@/utils/imgurlconfig.js'
export default {
    data(){
        return {
            imgurlconfig:ImgUrlconfig()
        }
    },
          props:{
          imgUrl:''//图片地址
      },
      methods:{
               beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
         return  isLt2M;
      },
     handleAvatarSuccess(res, file) {
         //成功后回调
         this.$emit('upload',res)
        //  将res上抛给父组件
        // this.imgUrl = URL.createObjectURL(file.raw);
      },
      },
      computed:{
          headers(){
              return {
                  'Authorization':'Bearer '+window.localStorage.getItem("token"),
              }
          }
      }
}
</script>

<style scoped> 

.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #ffffff;
    z-index: 100;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #ffffff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #f32e0c;
    border-radius: 6px;
    font-size: 28px;
    background-color: #ffffff;
    color: #e70909;
    width: 178px;
    height: 178px;
    line-height: 178px;
    margin: 0 50%;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
     margin: 0 50%;
  }
</style>