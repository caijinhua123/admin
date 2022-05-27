<template>
<div class="app-container">

    <el-table
    :data="prject.data"
    border
    style="width: 100%"
    class="table"
    align='center'>
    <el-table-column
      label="序号"
      width='200px'
      >
      <template slot-scope="scope">{{scope.$index+1}}</template>
    </el-table-column>
    <el-table-column
      label="项目名称"
      prop="name"
      >
    </el-table-column>
    <el-table-column
      label="项目描述"
      prop="description"
     >
    </el-table-column>
    <el-table-column
      label="预览图"
      prop="thumb"
     >
     <template slot-scope="scope">
         <el-image
         style="width:100px; height:100px"
      :src="imgurl+'/static/upload/2022-5-18-16-30-43-823-fe811.jpg'"
      fit="cover"></el-image></template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
    width='200px' >
      <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="github地址" placement="top">
        <el-button type="warning" @click="gogithub(scope.row)" icon="el-icon-s-promotion" circle></el-button>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
        <el-button type="primary" @click="handleClick(scope.row)" icon="el-icon-edit" circle></el-button>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="删除" placement="top">
         <el-button type="danger"  @click="deleteproject(scope.row.id)" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
        
      </template>
    </el-table-column>

    </el-table>

      <el-dialog
        :visible.sync="isRedact"
        width="50%">
        <span slot="footer" class="dialog-footer">
           <Addproject @submit='onSubmit' v-if="isRedact" :projectdata="sizeForm" />
        </span>
        </el-dialog>
</div>
   
</template>

<script>
import {getproject ,putproject,deleteproject} from '@/api/project'
import Addproject from '@/components/addproject'
import imgurlconfig from "@/utils/imgurlconfig"
export default {
    components:{
        Addproject
    },
    data(){
        return {
            prject:{},
            isRedact:false,
            sizeForm:{
                description:"", // 项目描述段落
                name: "", // 项目名称
                url: "", // 项目效果请求地址
                github: "", // 项目github地址
                thumb: "", // 缩略图，项目截图
                order: '' // 排序
            },
            imgurl:imgurlconfig(),
            projectdata:{}
        }
    },
    async created(){
     this.prject= await getproject()
    },
    methods:{
        handleClick(item){
            this.isRedact=true
            this.sizeForm=item

        },
        deleteproject(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            let res =await deleteproject(id)
           this.prject= await getproject()
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
        async  onSubmit(){
            this.isRedact=false
            // console.log(this.sizeForm,'111111111111');
            //  await putproject(this.sizeForm.id,this.sizeForm)
             this.prject=await getproject()
        },
        gogithub(data){
            console.log(data);
            window.open(data.github)
        }
    }
}
</script>

<style scoped>
    .dialog-footer{
    text-align: left;
}
</style>