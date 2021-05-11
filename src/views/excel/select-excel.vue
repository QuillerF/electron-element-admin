<template>
  <div class="app-container">
    <div class="flex-ar mb20">
      <el-select v-model="params.sort" placeholder="" class="mr20" style="width:250px" clearable>
        <el-option label="时间倒序" value="时间倒序"> </el-option>
        <el-option label="时间正序" value="时间正序"> </el-option>
      </el-select>
      <el-select v-model="params.type" placeholder="变动类型" class="mr20" style="width:250px" clearable>
        <el-option value="迁入"> </el-option>
        <el-option value="迁出"> </el-option>
        <el-option value="注销"> </el-option>
      </el-select>
      <el-date-picker
        v-model="daterange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="mr20"
      ></el-date-picker>
      <el-input
        v-model="params.name"
        prefix-icon="el-icon-search"
        class="mr20"
        placeholder="姓名"
        style="width:300px"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" class="mr20" @click="fetchData">搜索</el-button>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      v-table-height="{ bottomOffset: 70 }"
      height="100px"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" fixed label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" fixed prop="title"> </el-table-column>
      <el-table-column
        v-for="fruit in columns"
        :key="fruit.prop"
        :prop="fruit.prop"
        :label="fruit.label"
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="default" @click="toDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { ChangeLogsColumns } from './Enum'

export default {
  name: 'ExportExcel',
  components: { Pagination },
  data() {
    return {
      columns: ChangeLogsColumns,
      list: null,
      total: 10,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      isShowSetColumn: false,
      daterange: [],
      params: {
        page: 1,
        limit: 50,
        sort: '时间倒序',
        type: '',
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    toDelete() {
      this.$confirm('确认删除该条信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },
    toDetail(row, type = 'readonly') {
      this.$router.push({ path: '/excel/addlog', params: { row, type } })
    },
    columnsChange(val) {
      this.columns = val
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    toAddLogs() {
      this.$router.push('/excel/addlog')
    },
    showSetColumn() {
      this.isShowSetColumn = true
    },
    showFilterBox() {
      console.log('name')
    },
    async fetchData() {
      try {
        this.listLoading = true
        const res = await fetchList()
        this.list = res.data.items
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
      }
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
