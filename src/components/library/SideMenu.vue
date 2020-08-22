  <template>
     <el-menu
     class="categories"
     default-active="0"
     active-text-color="red">
         <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.id">
                        {{ item.name }}
 </el-menu-item>
     </el-menu>
  </template>
<script>
export default{
  name: 'SideMenu',
  data () {
    return {
      activeIndex: '1',
      menuList: []
    }
  },
  methods: {
    queryList () {
      this.$axios.get('/menu').then((body) => {
        console.log(body.data)
        if (body.data.success === true) {
          this.menuList = body.data.data.list
        }
      })
    }
  },
  created () {
    this.queryList()
  }
}
</script>
<style scoped>
 .categories {
 position: fixed;
 margin-left: 50%;
 left: -600px;
 top: 100px;
 width: 150px;
 }
</style>
