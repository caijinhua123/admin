<template>
<div class="app-container" v-if="bannerData&&bannerData.data&&bannerData.data.rows"> 
    <el-table
    :data="bannerData.data.rows"
    border
    style="width: 100%"
    class="table"
    align='center'>
    <el-table-column
      label="序号"
      width="50">
      <template slot-scope="scope">{{scope.$index +1+(currentPage-1)*10}}</template>
    </el-table-column>

    
    <el-table-column
      prop="title"
      label="文章名称"
      align='center'>
      <template slot-scope="scope">
        <el-popover
        placement="top-start"
        title="博客预览图"
        trigger="hover"
        >
        <el-image
      style="width: 100px; height: 100px"
      src="http://47.111.172.167:7001/static/upload/2022-4-23-2-12-6-541-ef041.jpg"
      fit="fit"
      :preview-src-list='imgArray'></el-image>
      <a href="#" target="_blank"
       @click.prevent="gotoBlog(scope.row)"
       slot="reference" >{{scope.row.title }}</a>
  </el-popover></template>
    </el-table-column>
    

    <el-table-column
      prop="description"
      label="文章描述"
      align='center'>
    </el-table-column>
    </el-table-column>
    <el-table-column
      prop="scanNumber"
      label="浏览量"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="scanNumber"
      label="评论量"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="category.name"
      label="所属分类"
      align='center'>
    </el-table-column>
    <el-table-column
      prop="createDate"
      label="创建时间"
      align='center'>
      <template slot-scope="scope">{{formatDate(scope.row.createDate)  }}</template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
    width='200px' >
      <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
        <el-button type="primary" @click="handleClick(scope.row.id)" icon="el-icon-edit" circle></el-button>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="删除" placement="top">
         <el-button type="danger"  @click="deleteBlog(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

<el-pagination
  :page-size="10"
  :pager-count="11"
  layout="prev, pager, next,total,->,sizes,jumper"
  :total="bannerData.data.total"
  @size-change='sizechange'
  @current-change='changePage'>
</el-pagination>
    
  </div>
   
</template>

<script>
import Upload from '@/components/upload'
import {blogList,deleteblog} from '@/api/blog'
import ImgUrlconfig from '@/utils/imgurlconfig.js'
import {formatDate} from '@/utils/tools'
export default {
  components:{
    Upload
  },
    data(){
        return {
            bannerData:{},
            imgurlconfig:ImgUrlconfig(),
            currentPage:1,
            imgArray:['http://47.111.172.167:7001/static/upload/2022-4-23-2-12-16-181-b9bc6.png','http://47.111.172.167:7001/static/upload/2022-4-23-2-12-6-541-ef041.jpg'],//图片数组
        }
    },
   async created(){
      this.bannerData= await blogList()
      // console.log(this.bannerData);
    },
    methods: {
      formatDate,
       async changePage(page){//切换页码
            this.bannerData= await blogList(page)
            this.currentPage = page
        },
       async sizechange(limit){
            this.bannerData=await blogList(this.currentPage,limit)
        },
        gotoBlog(blog){//点击文章名称预览图片
        window.open("http://mock.duyiedu.com/project/76/interface/api/210")
        // this.$router.push('/')
        },
      handleClick(row) {
        this.$router.push(`/Blog/putBlog/${row}`)
      },
      stop(){
        this.isRedact =false,
        this.sizeForm={}
      },
      deleteBlog(id){
         this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteblog(id)
           .then(async (result) => {
         this.bannerData= await blogList()
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
      }
    },
}
</script>

<style  scoped>
.table{
    text-align: center;
    
}
 .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
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