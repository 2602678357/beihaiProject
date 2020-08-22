<template>
    <el-menu :default-active="activeIndex" router background-color="#545c64" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                        {{ item.navItem }}
 </el-menu-item>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
  <a href="#" @click.prevent="logout"  style="color: #222;float: right;padding: 20px;">退出</a>
  <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
</el-menu>
</template>
<script>
export default {
  name: 'nav-menu',
  data () {
    return {
      activeIndex: '1',
      navList: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    queryList () {
      this.$axios.get('/nav').then((body) => {
        console.log(body.data)
        if (body.data.success === true) {
          this.navList = body.data.data.list
        }
      })
    },
    logout () {
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        localStorage.removeItem('user')
        // 跳转登录页面(编程式导航)
        this.$router.replace('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.queryList()
  }
}
</script>
