<template>
  <div class="app-container">
    <div class="flex-al mb20">
      <!-- <FilenameOption v-model="filename" class="mr20" /> -->
      <!-- <BookTypeOption v-model="bookType" class="mr20" /> -->

      <el-select v-model="params.sort" placeholder="" class="mr20" style="width:250px" clearable>
        <el-option label="户号排序" value="户号排序"> </el-option>
      </el-select>
      <el-input
        v-model="params.name"
        prefix-icon="el-icon-search"
        class="mr20"
        placeholder="姓名、联系方式、户号"
        style="width:300px"
        clearable
      ></el-input>
      <el-button type="primary" icon="el-icon-search" class="mr20" @click="fetchData">搜索</el-button>
      <el-button :loading="downloadLoading" class="mr20" type="primary" icon="el-icon-document" @click="handleDownload">
        导出表格
      </el-button>
      <el-button type="text" class="mr20" style="font-size:20px;color:#1684FC" @click="showFilterBox"
        ><svg-icon icon-class="filter"
      /></el-button>
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
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" fixed label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" fixed prop="title"> </el-table-column>
      <el-table-column v-for="fruit in columns" :key="fruit.prop" :prop="fruit.prop" :label="fruit.label">
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
import SetShowColumn from './components/SetShowColumn'
import Columns from './Enum'
// options components
// import FilenameOption from './components/FilenameOption'
// import AutoWidthOption from './components/AutoWidthOption'
// import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { Pagination, SetShowColumn },
  data() {
    return {
      columns: Columns,
      list: null,
      total: 10,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      isShowSetColumn: false,

      params: {
        page: 1,
        limit: 50,
        sort: '户号排序',
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
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
