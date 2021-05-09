<template>
  <div class="app-container">
    <div class="flex-ar mb20">
      <el-popover placement="bottom" title="配置显示列" width="500" trigger="click">
        <SetShowColumn :real-columns="columns" @change="columnsChange"></SetShowColumn>
        <el-button slot="reference" type="text">配置显示列</el-button>
      </el-popover>
    </div>
    <el-table
      ref="table"
      v-loading="listLoading"
      v-table-height="{ bottomOffset: 70 }"
      height="100px"
      :data="list"
      stripe
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" fixed label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" fixed prop="name"> </el-table-column>
      <el-table-column
        v-for="fruit in columns"
        :key="fruit.prop"
        :prop="fruit.prop"
        :label="fruit.label"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="operationType" fixed="right" label="数据类型" align="center"> </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="default" @click="toDetail(scope.row)">详情</el-button>
          <el-button
            v-if="type === 'waitapply'"
            type="text"
            size="default"
            style="color:#67C23A"
            @click="handleApply(scope.row, 1)"
            >通过</el-button
          >
          <el-button
            v-if="type === 'waitapply'"
            type="text"
            size="default"
            style="color:#F56C6C"
            @click="handleApply(scope.row, 2)"
            >驳回</el-button
          >
          <el-button
            v-if="type === 'waiting'"
            type="text"
            style="color:#E6A23C"
            size="default"
            @click="toReturn(scope.row)"
            >撤回</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { cloneDeep, debounce } from 'lodash'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Excel from '@/api/excel'
import { parseTime } from '@/utils'
import SetShowColumn from './components/SetShowColumn'
import FilterBox from './components/FilterBox'
import { Columns } from './Enum'
import { export_json_to_excel } from '@/vendor/Export2Excel'

export default {
  name: 'ExportExcel',
  components: { Pagination, SetShowColumn },
  data() {
    return {
      columns: Columns.filter(item => item.isDefaultShow),
      list: [],
      total: 10,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      isShowSetColumn: false,
      params: {
        approveStatus: 1,
        groupName: [],
        page: 1,
        size: 50
      },
      fetchDataDebounce: debounce(this.fetchData, 300)
    }
  },
  props: {
    type: {
      type: String, // waitapply,waiting,back
      default: 'back'
    }
  },
  created() {
    this.fetchDataDebounce()
  },
  async activated() {
    await this.fetchDataDebounce()
    this.$refs.table.doLayout()
  },
  methods: {
    toReturn(row) {
      this.$confirm('确认撤回吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_CANCEL(row.id)
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.closeSelectedTag()
        })
        .catch(() => {})
    },
    handleApply(row, status) {
      const txt = status === 1 ? '通过审核' : '驳回'
      this.$confirm(`确定${txt}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_HANDLE({ approveId: row.id, type: status })
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchDataDebounce()
        })
        .catch(() => {})
    },
    paramsChange(val = {}) {
      Object.assign(this.params, val)
      console.log(this.params)
      this.fetchDataDebounce()
    },
    toDelete() {
      this.$confirm('确认删除此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_DELETE(this.detail.id)
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.closeSelectedTag()
        })
        .catch(() => {})
    },
    toDetail(row, type = 'view') {
      this.$router.push({ path: '/apply/viewapply', query: { id: row.id, viewType: type } })
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
        const params = cloneDeep(this.params)
        params.approveStatus = this.type === 'back' ? 3 : 1
        const { data, total } = await Excel.APPROVE_LIST(params)
        this.list = data
        this.total = total
        this.listLoading = false
      } catch (error) {
        this.listLoading = false
      }
    },
    async handleDownload() {
      this.downloadLoading = true
      if (!Array.isArray(this.columns)) return
      const cls = this.columns.map(item => item.label)
      const clsp = this.columns.map(item => item.prop)
      const tHeader = ['姓名', ...cls]
      const filterVal = ['name', ...clsp]
      console.log('cl,clsp===>', tHeader, filterVal)
      const list = this.list
      const data = this.formatJson(filterVal, list)
      export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
        autoWidth: this.autoWidth,
        bookType: this.bookType
      })
      this.downloadLoading = false
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
