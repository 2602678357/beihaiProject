<template>
 <el-container>
 <el-aside style="width: 200px;margin-top: 20px">
 <switch></switch>
 <SideMenu @indexSelect="listByMenu" ref="SideMenu"></SideMenu>
 </el-aside>
 <el-main>
   <books class="books-area" ref="booksArea"></books>
 </el-main>
 </el-container>
</template>
<script>
import SideMenu from './SideMenu'
import Books from './Books'
export default {
  name: 'AppLibrary',
  data () {
    return {
    }
  },
  components: {SideMenu, Books},
  methods: {
    listByMenu () {
      // var cid = this.$refs.SideMenu.cid
      // alert(cid)
      // localStorage.setItem('cid', cid)
      // this.$refs.Books.queryList(cid)
      alert(this.$refs.SideMenu.cid)
      var that = this
      var cid = this.$refs.SideMenu.cid
      var url = 'categories/' + cid
      this.$axios.get(url).then(resp => {
        if (resp && resp.status === 200) {
          console.log(resp)
          that.$refs.booksArea.books = resp.data
        }
      }
      )
    }
  }
}
</script>
<style scoped>
 .books-area {
 width: 990px;
 margin-left: auto;
 margin-right: auto;
 }
</style>
