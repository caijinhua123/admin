<template>
  <div class="app-container">
    <div style="margin-bottom:40px;margin-top:10px">
    <h2>请编辑项目信息</h2>
    </div>
    <h3>项目标题</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入项目标题" v-model="form.name" ></el-input>
    </div>
    <h3>项目链接地址</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入项目链接地址" v-model="form.url" ></el-input>
    </div>
    <h3>GitHub地址</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入GitHub地址" v-model="form.github" ></el-input>
    </div>
    <h3>项目描述(每项描述以,分割)</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入文章描述" 
      v-model="form.description" type="textarea"
      rows=6  ></el-input>
    </div>

    <h3>预览图</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
     <Upload :imgUrl="form.thumb" @upload="uploadimg" />
    </div>
    <h3>排序等级</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
    <el-select 
    @change="changeselect"
      v-model="form.order" placeholder="请选择排序等级">
      <el-option v-for="key in projectType" 
      :key="key" :label="key" :value="key" style="margin-left=10px;"></el-option>
    </el-select></div>
    <div style="margin-bottom:20px;margin-top:20px">
    <el-button type="primary" @click="onSubmit" >{{projectdata?"确认修改":"发布项目"}}</el-button>
  </div>
  </div>
</template>

<script>
import {putproject,addproject} from '@/api/project'
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
      
      form:{
        description:'', // 项目描述段落
        name: "", // 项目名称
        url: "", // 项目效果请求地址
        github: "", // 项目github地址
        thumb: "", // 缩略图，项目截图
        order: '' // 排序
    },
      projectType:[1,2,3,4,5],
    }
  },
  async created(){
      if(this.projectdata){
          this.form ={...this.projectdata}
         this.form.description= this.form.description.toString()
      }
  },
  methods:{
      changeselect(row){
          if(this.projectdata){
              this.form.order=row
              this.$forceUpdate()
          }
      },
  onSubmit(){
    // this.form.description = this.form.description.split(',')
    if(this.projectdata){
        let id =this.form.id
        putproject(id,this.form)
        .then((result) => {
        console.log(result);
        this.form={
        description:"", // 项目描述段落
        name: "", // 项目名称
        url: "", // 项目效果请求地址
        github: "", // 项目github地址
        thumb: "", // 缩略图，项目截图
        order: '' // 排序
      };
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
    }else{

    addproject(this.form).then((result) => {
      this.form={
        description:"", // 项目描述段落
        name: "", // 项目名称
        url: "", // 项目效果请求地址
        github: "", // 项目github地址
        thumb: "", // 缩略图，项目截图
        order: '' // 排序
      };
       this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
        this.$router.push('/Project/projectList')
    }).catch((err) => {
      
    });
     } 
  },
  uploadimg(res){
    this.form.thumb = res.data
    console.log(this.form,'11111111111');
  }
  }
}
</script>

<style>

</style>