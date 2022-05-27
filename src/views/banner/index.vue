<template>
<div class="app-container"> 
    <el-button type="success" round @click="add">新增</el-button>
    <el-table
    :data="bannerData.data"
    border
    style="width: 100%"
    class="table">
    <el-table-column
      label="序号"
      width="100">
      <template slot-scope="scope">{{scope.$index +1}}</template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述">
    </el-table-column>
    <el-table-column
      prop="midImg"
      label="中图预览">
      <template slot-scope="scope"><el-image
      style="width: 100px; height: 100px"
      :src="imgurlconfig+scope.row.midImg"
      fit="cover"></el-image></template>
    </el-table-column>
    <el-table-column
      prop="bigImg"
      label="大图预览">
      <template slot-scope="scope"><el-image
      style="width: 100px; height: 100px"
      :src="imgurlconfig+scope.row.bigImg"
      fit="cover"></el-image></template>
       
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
    width='200px' >
      <template slot-scope="scope">
        <el-button type="primary" @click="handleClick(scope.row)" icon="el-icon-edit" circle></el-button>
         <el-button type="danger"  @click="open(scope.row)" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="form" v-if="isRedact">
    <h2>请编辑信息</h2>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="标题">
    <el-input v-model="sizeForm.title"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="sizeForm.description"></el-input>
  </el-form-item>

  <el-form-item label="首页中图">
    <Upload :imgUrl='sizeForm.midImg'
    @upload='uploadmid' />
  </el-form-item>
  <el-form-item label="首页大图">
    <Upload 
    @upload='upload' 
    :imgUrl='sizeForm.bigImg' />
  </el-form-item>

  <el-form-item size="large"  class="submit">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="stop"   >取消</el-button>
  </el-form-item>
</el-form>
  </div>
    
  </div>
   
</template>

<script>
import Upload from '@/components/upload'
import {getbanner,postbanner} from '@/api/banner'
import ImgUrlconfig from '@/utils/imgurlconfig.js'
export default {
  components:{
    Upload
  },
    data(){
        return {
            bannerData:{},
            isRedact:false,
            sizeForm:{},//当前操作的对象数组
            sizeFormindex:'',
            imgurlconfig:ImgUrlconfig(),
            isAdd:false
        }
    },
   async created(){
      this.bannerData= await getbanner()
      console.log(this.bannerData.data);
    },
    methods: {
      upload(res){
        // 先对比，找到将要修改的位置，修改后提交//更新大图
        this.$set(this.sizeForm,'bigImg',res.data)
      },uploadmid(res){
        // 先对比，找到将要修改的位置，修改后提交//更新大图
      this.$set(this.sizeForm,'midImg',res.data)
      },
      handleClick(row) {
        console.log(row);
        this.isRedact =true
        this.sizeForm={...row};
        //深度克隆数据,即将修改的数据
        //如果成功则改变数据，失败则恢复原数据
        
        this.sizeFormindex=this.bannerData.data.indexOf(row)
        //如果没有返回-1
      },
      onSubmit() {
        //提交新数据
        if(this.sizeFormindex===-1){//如果没有该数据则不能提交
          return
        } 
        if(this.isAdd){
          //新增数据
          if(this.sizeForm){
            this.bannerData.data.push(this.sizeForm)
            console.log(this.bannerData.data);
            
          }else{
             this.$message({
            type: 'warning',
            message: '创建失败!请填写完整信息'
          });
          return
          // 
          }
        }else {
          this.bannerData.data[this.sizeFormindex]=this.sizeForm
        this.bannerData.data.push()
        }
        //提交
        postbanner(this.bannerData.data).then((result) => {
         this.$message({
            type: 'success',
            message: '提交成功!'
          });
       }).catch((err) => {
         this.$message({
            type: 'warning',
            message: '提交失败!'
          });
       });
        this.isRedact =false
        this.isAdd=false
          this.sizeForm={}
      },
      stop(){
        this.isRedact =false,
        this.sizeForm={}
      },
       open(row) {//删除
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.bannerData.data.pop(row)
          console.log(this.bannerData.data);
           postbanner(this.bannerData.data)
           .then((result) => {
         this.$message({
            type: 'success',
            message: '删除成功!'
          });
       }).catch((err) => {
         this.$message({
            type: 'warning',
            message: '删除失败!'
          });
       });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      add(){
        this.isRedact =true
        this.isAdd=true
      }
    },
}
</script>

<style  scoped>
.table{
    text-align: center;
    
}
.form{
  position: absolute;
  background-color: rgb(133, 177, 224);
  box-sizing: border-box;
  padding: 30px;
  left: 50%;
  top: 50%;
  z-index: 99;
  transform: translate(-50%,-50%);
  width: 600px;
  height: 700px;
  border-radius: 10px;
}
  .submit{
    margin: 30px 90px;
  }
</style>