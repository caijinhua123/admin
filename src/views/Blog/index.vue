<template>
  <div class="app-container">
      
       <el-input placeholder="请输入内容"
        v-model="input" class="input-with-select"
        
         >
    <el-select v-model="order" slot="prepend" 
    placeholder="选择等级"   
    class="select" 
    >
    
      <el-option  v-for="key of ordertype"  
      :key="key" :label="key" :value="key"
     ></el-option>
    </el-select>
  </el-input>
    <el-button type="primary"  @click="add"  class="add">添加</el-button>
   <el-table
    :data="data.data"
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
      label="博客类别"
      prop="name"
      >
      <!-- <template slot-scope="scope">{{scope.name }}</template> -->
    </el-table-column>
    <el-table-column
      label="文章数量"
      prop="articleCount"
     >
      <!-- <template slot-scope="scope">{{scope.articleCount}}</template> -->
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
    width='200px' >
      <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top">
        <el-button type="primary" @click="handleClick(scope.row)" icon="el-icon-edit" circle></el-button>
         </el-tooltip>
         <el-tooltip class="item" effect="dark" content="删除" placement="top">
         <el-button type="danger"  @click="deleteBlog(scope.id)" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
      </template>
    </el-table-column>

    </el-table>
  <el-dialog
  title="请编辑信息"
  :visible.sync="isRedact"
  width="50%">
  <span slot="footer" class="dialog-footer">
       <el-form ref="form"  :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="分类名称">
    <el-input v-model="sizeForm.name"></el-input>
  </el-form-item>
  <el-form-item label="排序等级"  >
    <el-select   v-model="sizeForm.order" placeholder="请选择排序等级">
      <el-option  v-for="key of ordertype" 
      :key="key" :label="key" :value="key" style="margin-left=10px;"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item size="large"  >
  </el-form-item>
</el-form>
<el-button @click="stop">取 消</el-button>
    <el-button type="primary" @click="onSubmit" >确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { blogtype,getoneblogtype,addblogtype,deleteblogtype,putblogtype } from '@/api/blog'
export default {
     data() {
    return {
      input: '',
      data:{},
      select:'',
      datatype:{},
      ordertype:[1,2,3,4,5],
      order:'',
      isRedact:false,
      sizeForm:{}
    }
  },
    async created(){
       this.data= await blogtype()
       this.datatype=this.data.data
    },
    methods:{
        change(id){
            console.log(id);
            // console.log(this.select);
        },
        add(){
            if( this.input){
               addblogtype({
                   'name':this.input,
                   "order":this.order?this.order:1
                   }).then(async (result) => {
                    this.data= await blogtype()
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                   }).catch((err) => {
                        this.$message({
                        type: 'warring',
                        message: '添加失败!'
                    });  
                   });
            }else{
               this.$message({
                type: 'warning',
                message: '请填写分类信息!'
            }); 
            }
        },
       async changeselect(type){
           console.log(type);
           this.data=await getoneblogtype(type)
           console.log(this.data);
        },
        deleteBlog(id){
            this.$confirm('此操作将永久删除该文章分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteblogtype(id).then(async (res) => {
                console.log(res); 
                this.data= await blogtype()
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
             }).catch((err) => { 
                 this.$message({
                        type: 'warring',
                        message: '删除失败!'
                    });  
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
            
        },
        handleClick(data){
             this.isRedact=true
             this.sizeForm=data
             console.log(data);
        },
        onSubmit(){
            let name= this.sizeForm.name
            let order= this.sizeForm.order
            putblogtype(this.sizeForm.id,{name,order})
            .then(async (res) => { this.data= await blogtype()
                      this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    console.log(res); })
                    .catch(() => {  this.$message({
                        type: 'warring',
                        message: '修改失败!'
                    });  })
            this.isRedact=false
        },
        stop(){
            this.isRedact=false
        }
    }
}
</script>

<style scoped>
.add{
    margin-left: 20px;
}
.input-with-select{
    width: 400px;
}
.select{
    width: 100px;
}
.dialog-footer{
    text-align: left;
}
</style>