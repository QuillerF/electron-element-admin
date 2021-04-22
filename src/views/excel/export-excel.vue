<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        Export Excel
      </el-button>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table
      v-loading="listLoading"
      v-el-height-adaptive-table="{ bottomOffset: 30 }"
      height="100px"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="title"> </el-table-column>
      <el-table-column label="性别" prop="title"> </el-table-column>
      <el-table-column label="联系方式" prop="title"> </el-table-column>
      <el-table-column label="身份证号" prop="title"> </el-table-column>
      <el-table-column label="户号" prop="title"> </el-table-column>
      <el-table-column label="组别" prop="title"> </el-table-column>
      <el-table-column label="民族" prop="title"> </el-table-column>
      <el-table-column label="宗教信仰" prop="title"> </el-table-column>
      <el-table-column label="出生日期" prop="title"> </el-table-column>
      <el-table-column label="参保情况" prop="title"> </el-table-column>
      <el-table-column label="户主" prop="title"> </el-table-column>
      <el-table-column label="与户主关系" prop="title"> </el-table-column>
      <el-table-column label="是否贫困家庭" prop="title"> </el-table-column>
      <el-table-column label="是否低保" prop="title"> </el-table-column>
      <el-table-column label="是否五保" prop="title"> </el-table-column>
      <el-table-column label="是否独生子女" prop="title"> </el-table-column>
      <el-table-column label="兵役情况" prop="title"> </el-table-column>
      <el-table-column label="是否军属家庭" prop="title"> </el-table-column>
      <el-table-column label="政治面貌" prop="title"> </el-table-column>
      <el-table-column label="婚姻状况" prop="title"> </el-table-column>
      <el-table-column label="职业" prop="title"> </el-table-column>
      <el-table-column label="家庭收入" prop="title"> </el-table-column>
      <el-table-column label="备注" prop="title"> </el-table-column>

      <!-- <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
