<template>
  <div class="app-container">
    <div class="flex-ar mb20">
      <el-select v-model="params.orderBy" placeholder="" class="mr20" style="width:250px">
        <el-option label="户号排序" value="hhRegistryNo"> </el-option>
        <el-option label="最近修改" value="updatedAt"> </el-option>
      </el-select>
      <el-input
        v-model="params.searchName"
        prefix-icon="el-icon-search"
        class="mr20"
        placeholder="姓名、联系方式、户号"
        style="width:300px"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" class="mr20" @click="fetchData">搜索</el-button>
      <el-popover placement="bottom" title="筛选项" width="700" trigger="click">
        <FilterBox @change="paramsChange"></FilterBox>
        <el-button slot="reference" type="text" class="mr20" style="font-size:20px;color:#1684FC" @click="showFilterBox"
          ><svg-icon icon-class="filter"
        /></el-button>
      </el-popover>
      <el-button :loading="downloadLoading" class="mr20" type="text" @click="handleDownload">
        导出表格
      </el-button>
      <el-button type="text" class="mr20" @click="toAddLogs">添加记录</el-button>
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
      <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="default" @click="handleApply(scope.row, 1)">同意</el-button>
          <el-button type="text" size="default" @click="handleApply(scope.row, 2)">拒绝</el-button>
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
  components: { Pagination, SetShowColumn, FilterBox },
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
  created() {
    this.fetchDataDebounce()
  },
  async activated() {
    await this.fetchDataDebounce()
    this.$refs.table.doLayout()
  },
  methods: {
    handleApply(row, status) {
      const txt = status === 1 ? '同意' : '拒绝'
      this.$confirm(`确定审批${txt}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_HANDLE({ approveId: row.approveId, type: status })
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
      this.$confirm('确认删除该条信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    },
    toDetail(row, type = 'view') {
      if (type === 'add') {
        this.$router.push({ path: '/excel/addlog', query: { id: row.id, viewType: type } })
        return
      }
      if (type === 'edit') {
        this.$router.push({ path: '/excel/editlog', query: { id: row.id, viewType: type } })
        return
      }
      this.$router.push({ path: '/excel/viewlog', query: { id: row.id, viewType: type } })
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
