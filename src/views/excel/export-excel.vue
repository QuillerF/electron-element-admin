<template>
  <div class="app-container">
    <div class="flex-ar mb20">
      <el-select v-model="params.sort" placeholder="" class="mr20" style="width:250px" clearable>
        <el-option label="户号排序" value="户号排序"> </el-option>
        <el-option label="最近修改" value="最近修改"> </el-option>
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
          <el-button type="text" size="default" @click="toDetail(scope.row, 'view')">详情</el-button>
          <el-button type="text" size="default" @click="toDetail(scope.row, 'edit')">修改</el-button>
          <el-button type="text" size="default" @click="toDelete(scope.row)">删除</el-button>
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
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Excel from '@/api/excel'
import { parseTime } from '@/utils'
import SetShowColumn from './components/SetShowColumn'
import FilterBox from './components/FilterBox'
import { Columns } from './Enum'

export default {
  name: 'ExportExcel',
  components: { Pagination, SetShowColumn, FilterBox },
  data() {
    return {
      columns: Columns.filter(item => item.isDefaultShow),
      list: null,
      total: 10,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      isShowSetColumn: false,
      params: {
        birthdayEndDate: '',
        birthdayStartDate: '',
        education: '',
        familyIncomeEnd: 0,
        familyIncomeStart: 0,
        farmlandMuEnd: '',
        farmlandMuStart: '',
        groupName: '',
        insurance: '',
        isFiveGuarantee: '',
        isLowIncome: '',
        isMilitaryFamily: '',
        isOnlyChild: '',
        isPoverty: '',
        marriage: '',
        nation: '',
        orderBy: '',
        politicalStatus: '',
        religion: '',
        searchName: '',
        page: 1,
        size: 50
      }
    }
  },
  created() {
    this.fetchData()
  },
  activated() {
    this.$refs.table.doLayout()
  },
  methods: {
    paramsChange(val = {}) {
      Object.assign(this.params, val)
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
        const { data, total } = await Excel.VILLAGER_MANAGER_LIST(this.params)
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
        const tHeader = ['姓名'].push(...this.columns.map(item => item.label))
        const filterVal = ['name'].push(...this.columns.map(item => item.prop))
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
