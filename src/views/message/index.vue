<template>
  <div class="app-container" v-if="getmessages && getmessages.data && getmessages.data.rows">

    <el-table
    :data="getmessages.data.rows"
    border
    style="width: 100%"
    class="table"
    align='center'>
    <el-table-column
      label="序号"
      width='100px'
      >
      <template slot-scope="scope">{{scope.$index +1+(currentPage-1)*pagesize}}</template>
    </el-table-column>
    <el-table-column
      label="预览图"
      prop="avatar"
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
      label="留言内容"
      prop="content"
      >
    </el-table-column>
    <el-table-column
      label="留言日期"
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
         <el-button type="danger"  @click="deletemessages(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
        
      </template>
    </el-table-column>

    </el-table>
        <el-pagination
    :page-size='pagesize'
    :page-sizes="[5, 10, 15, 20]"
    :pager-count="11"
    layout="prev, pager, next,total,->,sizes,jumper"
    :total="getmessages.data.total"
    @size-change='sizechange'
    @current-change='changePage'>
    </el-pagination>
    </div>
</template>

<script>
import {getMessages,delMessage } from '@/api/message'
import imgurlconfig from "@/utils/imgurlconfig"
import {formatDate} from '@/utils/tools'
export default {
    data(){
        return {
             getmessages:{},
             imgurl:imgurlconfig(),
             currentPage:1,
             pagesize:5
        }
    },
    async created(){
       this.getmessages = await getMessages(this.currentPage,this.pagesize)
       console.log(this.getmessages);
    },
    methods:{
        formatDate,
       async deletemessages(id){
           this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          console.log(id);
            let res =await delMessage(id)
            console.log(res);
           this.getmessages = await getMessages(this.currentPage,this.pagesize)
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
            this.getmessages= await getMessages(page,this.pagesize)
            this.currentPage = page
        },
        async sizechange(limit){
          console.log(limit);
            this.getmessages= await getMessages(this.currentPage,limit)
        },
    }
}
</script>

<style>

</style>