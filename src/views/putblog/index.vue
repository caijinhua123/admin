<template>
  <Addblog :blogdata='form' />
</template>

<script>
import Addblog from '@/components/addblog' 
import { getblog } from '@/api/blog'
export default {
  components:{
    Addblog
  },
  data(){
      return {
          form:''
      }
  },
 async created(){
     this.form =  await getblog(this.$route.params.id)
     console.log(this.form);
  },
  methods:{

  }
}
</script>

<style>

</style>