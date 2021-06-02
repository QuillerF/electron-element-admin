<template>
  <div class="app-container">
    <div class="flex-ar mb20">
      <el-select v-model="params.orderByRule" placeholder="" class="mr20" style="width:250px">
        <el-option label="创建时间倒序" value="desc"> </el-option>
        <el-option label="创建时间正序" value="asc"> </el-option>
      </el-select>
      <el-select v-model="params.changeType" placeholder="变动类型" class="mr20" style="width:250px" clearable>
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
        v-model="params.searchName"
        prefix-icon="el-icon-search"
        class="mr20"
        placeholder="姓名"
        style="width:300px"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" class="mr20" @click="fetchDataDebounce">搜索</el-button>
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
      <el-table-column :formatter="formatTime" label="创建时间" align="center" prop="createdAt"> </el-table-column>
      <!-- <el-table-column align="center" fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="default" @click="toDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="params.page"
      :limit.sync="params.size"
      @pagination="fetchDataDebounce"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Excel from '@/api/excel'
import { debounce, parseTime } from '@/utils'
import { ChangeLogsColumns } from './Enum'
import dayjs from 'dayjs'

export default {
  name: 'ExportExcel',
  components: { Pagination },
  data() {
    return {
      columns: ChangeLogsColumns,
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      isShowSetColumn: false,
      daterange: [],
      params: {
        orderByRule: 'desc',
        changeType: '',
        startDate: '',
        endDate: '',
        page: 1,
        searchName: '',
        size: 50
      },
      fetchDataDebounce: debounce(this.fetchData, 300)
    }
  },
  created() {
    this.fetchDataDebounce()
  },
  activated() {
    this.fetchDataDebounce()
  },
  methods: {
    formatTime(row, col, value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm')
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
        const [start, end] = this.daterange || []
        this.params.startDate = start
        this.params.endDate = end
        const { data, total } = await Excel.VILLAGER_MANAGER_VILLAGER_CHANGE_LIST(this.params)
        this.list = data
        this.total = total
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
