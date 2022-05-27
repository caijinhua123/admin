<template>
  <div class="app-container" v-if="commentData && commentData.data && commentData.data.rows">

    <el-table
    :data="commentData.data.rows"
    border
    style="width: 100%"
    class="table"
    align='center'>
    <el-table-column
      label="序号"
      width='100px'
      >
      <template slot-scope="scope">{{scope.$index +1+(currentPage-1)*10}}</template>
    </el-table-column>
    <el-table-column
      label="预览图"
      prop="thumb"
     >
     <template slot-scope="scope">
         <el-image
         style="width:100px; height:100px"
      :src="imgurl+scope.row.avatar"
      fit="cover"></el-image></template>
    </el-table-column>
    <el-table-column
      label="名称"
      prop="nickname"
      >
    </el-table-column>
    <el-table-column
      label="评论文章"
     >
     <template slot-scope="scope">{{scope.row.blog.title}}</template>
    </el-table-column>
    <el-table-column
      label="评论内容"
      prop="content"
      >
    </el-table-column>
    <el-table-column
      label="评论日期"
      prop="createDate"
      >
      <template slot-scope="scope">{{formatDate(scope.row.createDate)}}</template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
    width='200px' >
      <template slot-scope="scope">
         <el-tooltip class="item" effect="dark" content="删除" placement="top">
         <el-button type="danger"  @click="deleteComment(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
        
      </template>
    </el-table-column>

    </el-table>
    <el-pagination
    :page-size="10"
    :pager-count="11"
    layout="prev, pager, next,total,->,sizes,jumper"
    :total="commentData.data.total"
    @size-change='sizechange'
    @current-change='changePage'>
    </el-pagination>
    </div>
</template>

<script>
import {getcomment,deletecomment } from '@/api/comment'
import imgurlconfig from "@/utils/imgurlconfig"
import {formatDate} from '@/utils/tools'
export default {
    data(){
        return {
             commentData:{},
             imgurl:imgurlconfig(),
             currentPage:1
        }
    },
    async created(){
       this.commentData = await getcomment()
    },
    methods:{
        formatDate,
       async deleteComment(id){
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            let res =await deletecomment(id)
           this.commentData= await getcomment()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        async changePage(page){//切换页码
            this.commentData= await blogList(page)
            this.currentPage = page
        },
        async sizechange(limit){
            this.getcomment= await getcomment(this.currentPage,limit)
        },
    }
}
</script>

<style>

</style>