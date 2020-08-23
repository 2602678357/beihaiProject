  <template>
     <el-menu
     class="categories"
     default-active="0"
     active-text-color="red">
         <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.id">
                          <p @click="change(item.id)">{{ item.name }}</p>
 </el-menu-item>
     </el-menu>
  </template>
<script>
export default {
  inject: ['reload'],
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
    },
    change: function (id) {
      this.$router.push({
        path: '/library',
        query: {
          cid: id
        }
      })
      this.reload()
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
