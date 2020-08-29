  <template>
     <el-menu
     class="categories"
     default-active="0"
     @select="handleSelect"
     active-text-color="red">
         <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.id.toString()">
                          <!-- <p @click="change(item.id)">{{ item.name }}</p> -->
                          <p>{{ item.name }}</p>
 </el-menu-item>
     </el-menu>
  </template>
<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      activeIndex: '1',
      menuList: [],
      cid: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.cid = key
      this.$emit('indexSelect')
    },
    queryList () {
      var that = this
      this.$axios.get('/menu').then((body) => {
        console.log(body.data)
        if (body.data.success === true) {
          that.menuList = body.data.data.list
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
 margin-left: 45%;
 left: -600px;
 top: 100px;
 width: 150px;
 }
</style>
