<template>
<div>
  <p>{{cid}}</p>
    <el-input placeholder="请输入搜索内容" v-model="title" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="queryList"></el-button>
    </el-input>
    <el-row style="height: 840px;">
        <el-tooltip effect="dark" placement="right"  v-for="(item,i) in books" :key="i" >
            <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
            <p slot="content" style="font-size: 13px;margin-bottom: 6px"> <span>{{item.author}}</span>
            <span>{{item.date}}</span>
            <span>{{item.press}}</span></p>
            <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
                <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;m
                argin-right: 15px" class="book"
                bodyStyle="padding:10px" shadow="hover"> <div class="cover"> <img :src="item.cover" alt="封面">
                    </div>
                        <div class="info">
                            <div class="title"> <a href="">{{item.title}}</a>
                        </div>
                    </div>
                    <div class="author">{{item.author}}</div>
                </el-card>
        </el-tooltip>
        </el-row>
    <el-row>
        <el-pagination
                      background
                      layout="prev, pager, next"
                      :pagination="pagination"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pagination.pageIndex"
                      :page-size="pagination.pageSize"
                      :total="pagination.total">
                </el-pagination>
    </el-row>
</div>
</template>
<script>
export default {
  name: 'Books',
  data () {
    return {
      title: '',
      cid: '',
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      books: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
      for (var i = 0; i < this.books.length; i++) {
        alert(this.multipleSelection[i].id)
      }
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
    },
    handleCurrentChange (val) {
      this.pagination.pageIndex = val
      alert(val)
      alert(this.pagination.pageIndex)
      this.queryList()
    },
    queryList () {
      let params = {
        cid: this.$route.query.cid,
        title: this.title,
        pageNo: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      this.$axios.get('/book', {params: params}).then((body) => {
        console.log(body.data)
        if (body.data.success === true) {
          this.books = body.data.data.list
          this.pagination.total = body.data.data.list ? body.data.data.total : 0
        }
      })
      this.$router.push({
        path: '/library'
      })
    }
  },
  created () {
    this.queryList()
  }
  // watch: {
  // }
}
</script>
<style scoped>
    .main-login {
        height: 100%;
        width: 800px;
        margin: 0 auto;
    }
    .danger-text {
        color: #F56C6C;
    }
</style>
