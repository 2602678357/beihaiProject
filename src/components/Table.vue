<template>
    <div class="main-login">
            <div slot="banner" class="top-right">
                <el-button type="primary" size="small"  slot="reference">新增</el-button> &nbsp;
                <el-button type="danger" size="small"  slot="reference">批量删除</el-button> &nbsp;
                <el-input placeholder="请输入搜索内容" v-model="username" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="queryList"></el-button>
                </el-input>
            </div>
            <div slot="main" class="main-body">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        tooltip-effect="light"
                        height="200px"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="id" label="id">
                    </el-table-column>
                    <el-table-column
                        prop="username" label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="password" label="密码">
                    </el-table-column>
                </el-table>
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
            </div>
    </div>
</template>
<script>
// import { debounce } from '@/util.js'
export default {
  name: 'Table',
  data () {
    return {
      username: '',
      pagination: {
        pageIndex: 1,
        pageSize: 2,
        total: 0
      },
      label: '用户管理',
      tableData: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
      for (var i = 0; i < this.tableData.length; i++) {
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
        username: this.username,
        pageNo: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      this.$axios.get('/find', {params: params}).then((body) => {
        console.log(body.data)
        if (body.data.success === true) {
          this.tableData = body.data.data.list
          this.pagination.total = body.data.data.list ? body.data.data.total : 0
        }
      })
    }
  },
  created () {
    this.queryList()
  }
  // toggleSelection (rows) {
  //   if (rows) {
  //     rows.forEach(row => {
  //       this.$refs.multipleTable.toggleRowSelection(row)
  //     })
  //   } else {
  //     this.$refs.multipleTable.clearSelection()
  //   }
  // }
  // mounted () {
  //   this.$watch('username', debounce(() => {
  //     this.pagination.pageIndex = 1
  //     this.queryList()
  //   }, 1000))
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
