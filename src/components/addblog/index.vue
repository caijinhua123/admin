<template>
  <div class="app-container">
    <h2>文章标题</h2>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入文章标题" v-model="form.title" ></el-input>
    </div>
    <Editor height="500px" 
    :initialValue='form.markdownContent' 
    ref="toastuiEditor" 
    :options='editorOptions' />

    <h3>文章描述</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
      <el-input placeholder="请输入文章描述" 
      v-model="form.description" type="textarea"
      rows=6  ></el-input>
    </div>

    <h3>文章头图</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
     <Upload :imgUrl="form.thumb" @upload="uploadimg" />
    </div>
    <h3>文章分类</h3>
    <div style="margin-bottom:20px;margin-top:20px"> 
    <el-select 
    @change="changeselect"
      v-model="form.categoryId" placeholder="请选择分类">
      <el-option v-for="key of blogType.data" 
      :key="key.id" :label="key.name" :value="key.id" style="margin-left=10px;"></el-option>
    </el-select></div>
    <div style="margin-bottom:20px;margin-top:20px">
    <el-button type="primary" @click="onSubmit" >{{blogdata?"确认修改":"发布文章"}}</el-button>
  </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { Editor } from '@toast-ui/vue-editor';
import {addblog,blogtype} from '@/api/blog.js'
import Upload from "@/components/upload"
export default {
  components:{
    Editor,
    Upload
  },
  props:{
      blogdata:{}
  },
  data(){
    return {
      
      form:{
        title:'',
        markdownContent:'',//文章内容,
        description:"",//描述
        thumb:"",//头图  
        categoryId:"",//文章类型
        // toc:[],//目录
        createDate:'',
        htmlContent:'',//html格式文章内容
      },
      blogType:"",
      editorOptions:{
        language:'zh-CN'
      }
    }
  },
  async created(){
    this.blogType=await blogtype()
    if(this.blogdata){
        // this.blogdata.data.categoryId =category
        this.form=this.blogdata.data
        this.form.categoryId=this.blogdata.data.category.id
        delete this.form.category
        delete this.form.id
        delete this.form.scanNumber
        delete this.form.commentNumber
        this.form.toc=''
        this.$refs.toastuiEditor.invoke('setHTML',this.form.htmlContent)
    }
  },
  methods:{
      changeselect(row){
          if(this.blogdata){
              this.form.categoryId=row
              this.$forceUpdate()
          }
      },
  onSubmit(){
    let html = this.$refs.toastuiEditor.invoke('getHTML');
    let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
    this.form.createDate=new Date().getTime()
    if(this.blogdata){
        delete this.form.createDate
    }
    this.form.htmlContent=html
    this.form.markdownContent=markdown
    addblog(this.form).then((result) => {
      this.form={
        title:'',
        markdownContent:" ",//文章内容,
        description:"",//描述
        thumb:"",//头图  
        categoryId:"",//文章类型
        toc:[],//目录
        createDate:'',
        htmlContent:'',//html格式文章内容
      };
      this.$refs.toastuiEditor.invoke('setMarkdown','')
       this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
        this.$router.push('/Blog/BlogList')
    }).catch((err) => {
      
    }); 
  },
  uploadimg(res){
    this.form.thumb = res.data
  }
  }
}
</script>

<style>

</style>