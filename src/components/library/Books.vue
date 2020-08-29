<template>
<div>
    <!-- <el-input placeholder="请输入搜索内容" v-model="title" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="queryList"></el-button>
    </el-input> -->
    <el-row>
        <search-bar @onSearch='searchResult' ref="searchBar"></search-bar>
        <edit-form @onSubmit="queryList()" ref="edit"></edit-form>
        <el-tooltip effect="dark" placement="right" style="margin-left:20px;"  v-for="(item,i) in books" :key="i" :index="item.id.toString()">
             <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.id}}</p>
            <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
            <p slot="content" style="font-size: 13px;margin-bottom: 6px"> <span>{{item.author}}</span>
            <span>{{item.date}}</span>
            <span>{{item.press}}</span></p>
            <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
                <el-card style="width: 135px;margin-bottom: 20px;height: 260px;float: left;m
                argin-right: 15px" class="book"
                bodyStyle="padding:10px" shadow="hover">
                <div class="cover" @click="editBook(item)"> <img style="width:100px;height:170px;" :src="item.cover" alt="封面"></div>
                        <div class="info">
                            <div class="title" style="text-align:center"> <a href="">{{item.title}}</a>
                        </div>
                    </div>
                    <div class="author">{{item.author}}</div>
                    <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
                </el-card>
        </el-tooltip>
        </el-row>
    <el-row>
        <el-pagination
                      background
                      layout="sizes, prev, pager, next, jumper, total"
                      :pagination="pagination"
                      :page-sizes="[8, 15, 30, 50, 100]"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pagination.pageIndex"
                      :page-size="pagination.pageSize"
                      :total="pagination.total">
                </el-pagination>
                <!-- <el-pagination
                  background
                  layout="sizes, prev, pager, next, jumper"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :pagination="pagination"
                  :page-sizes="[8, 15, 30, 50, 100]"
                  :current-page="pagination.currentPage"
                  :page-size="pagination.pagesize"
                  :total="pagination.total">
                </el-pagination> -->
    </el-row>
</div>
</template>
<script>
import SearchBar from './SearchBar'
import EditForm from './EditForm'
export default {
  name: 'Books',
  // 组件名
  components: {EditForm, SearchBar},
  data () {
    return {
      title: '',
      cid: '',
      pagination: {
        pageIndex: 1,
        pageSize: 8,
        total: 0
      },
      // pagination: {
      //   currentPage: 1,
      //   pagesize: 8,
      //   total: 0
      // },
      books: []
    }
  },
  mounted: function () {
    this.queryList()
  },
  methods: {
    searchResult () {
      // var that = this
      // this.$axios.get('/search?keywords=' + this.$refs.searchBar.keywords, {}).then(resp => {
      //   if (resp && resp.status === 200) {
      //     that.books = resp.data
      //   }
      // })
      this.queryList()
    },
    deleteBook (id) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/delete', {id: id}).then(resp => {
            if (resp && resp.status === 200) {
              this.queryList()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改图书
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        menu: {
          id: item.menu.id.toString(),
          name: item.menu.name
        }
      }
      console.log(item)
    },
    // 改变每页数量
    handleSizeChange (val) {
      alert(val)
      this.pagination.pageSize = val
      this.queryList()
    },
    // 当前页跳转
    handleCurrentChange (val) {
      alert(val)
      this.pagination.pageIndex = val
      this.queryList()
    },
    // queryList () {
    //   let params = {
    //     currentPage: this.pagination.currentPage,
    //     pagesize: this.pagination.pagesize
    //   }
    //   var that = this
    //   this.$axios.get('/books', {params: params}).then((resp) => {
    //     console.log(resp)
    //     if (resp && resp.status === 200) {
    //       that.books = resp.data.pagination.content
    //       console.log(resp.data.pagination.totalPages)
    //       // 总的记录数
    //       var total = resp.data.pagination.totalElements
    //       that.pagination.total = resp.data.pagination.content ? total : 0
    //       console.log(that.pagination.total)
    //     }
    //   })
    // }
    queryList () {
      let params = {
        cid: this.cid,
        title: this.$refs.searchBar.keywords,
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
    }
  }
  // created () {
  //   this.queryList()
  // }
  // watch: {
  // }
}
</script>
<style scoped>
    /* .main-login {
        height: 100%;
        width: 800px;
        margin: 0 auto;
    } */
    .danger-text {
        color: #F56C6C;
    }
    .cover {
      width: 115px;
      height: 172px;
      margin-bottom: 7px;
      overflow: hidden;
      cursor: pointer;
    }
    .img {
      width: 115px;
      height: 172px;
    }
    .title {
      font-size: 14px;
      text-align: left;
    }
    .author {
      display: block;
      line-height: 17px;
    }
    a {
      text-decoration: none;
    }
    a:link, a:visited, a:focus {
      color:  #3377aa;
    }
</style>
