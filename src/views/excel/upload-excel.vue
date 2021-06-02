<template>
  <div v-loading="loading" class="app-container">
    <div class="flex-ar">
      <el-button :loading="downloadLoading" type="text" size="mini" @click="handleDownload">下载导入模板</el-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div v-if="errorData.length" class="mt10" style="width: 80%;margin:auto;margin-top:20px;">
      共上传 {{ newData.length }} 条居民信息,其中失败 {{ errorData.length }} 条
    </div>
    <el-table
      v-if="errorData.length"
      v-table-height="{ bottomOffset: 50 }"
      height="100px"
      :data="errorData"
      border
      highlight-current-row
      style="width: 80%;margin:auto;margin-top:10px;"
    >
      <el-table-column align="center" fixed label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="item of tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :style="item.color ? 'color:#F56C6C' : ''"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import Excel from '@/api/excel'
import { Columns } from './Enum'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      downloadLoading: false,
      columns: Columns,
      errorData: [],
      tableData: [],
      tableHeader: [
        { label: '姓名', prop: 'name', width: '200px' },
        { label: '组别', prop: 'groupName', width: '200px' },
        { label: '失败原因', prop: 'errorReason', color: '#F56C6C' }
      ],
      objEnum: {},
      newData: [],
      loading: false
    }
  },
  created() {
    this.setObjEnum()
  },
  methods: {
    setObjEnum() {
      const objEnum = {}
      this.columns.forEach(el => {
        objEnum[el.label] = el.prop
      })
      objEnum['出生日期'] = 'birthdayStr'
      this.objEnum = objEnum
    },
    async handleDownload() {
      this.downloadLoading = true
      if (!Array.isArray(this.columns)) return
      const cls = this.columns.map(item => item.label)
      const clsp = this.columns.map(item => item.prop)
      const tHeader = ['序号', ...cls]
      const filterVal = ['sort', ...clsp]
      console.log('cl,clsp===>', tHeader, filterVal)
      const list = [
        {
          birthday: '2021-05-08',
          createdAt: '2021-05-09T07:40:00',
          createdByName: 'Jay Chou',
          education: '小学',
          familyIncome: 30000,
          farmlandMu: 10,
          farmlandRemark: '十亩地',
          gender: '男',
          groupId: 'group-one',
          groupName: '一组',
          hhRegistryMaster: null,
          hhRegistryNo: 'jw1535',
          hhRegistrySelf: null,
          hhRelation: '本人',
          houseHolderName: '张三',
          id: '5895332c6739419bbce4d2627514408e',
          idCardBack: null,
          idCardFront: null,
          idCardNo: null,
          insurance: '新农合',
          isFiveGuarantee: '否',
          isLowIncome: '否',
          isMilitaryFamily: '否',
          isMoveIn: '否',
          isOnlyChild: '否',
          isPoverty: '否',
          marriage: '未婚',
          military: '否',
          moveInDate: null,
          moveInReason: null,
          moveInRemark: null,
          name: '张三三',
          nation: '汉族',
          phone: null,
          politicalStatus: '中共党员',
          religion: '无',
          remark: null,
          residenceAddress: '河南省郑州市',
          residentialAddress: '河南省郑州市',
          status: '正常',
          updatedAt: null,
          wordType: null
        }
      ]
      const data = this.formatJson(filterVal, list)
      export_json_to_excel({
        header: tHeader,
        data,
        filename: '居民导入模板',
        autoWidth: true,
        bookType: 'xlsx'
      })
      this.$message({
        message: '下载成功',
        type: 'success'
      })
      this.downloadLoading = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    async handleSuccess({ results, header }) {
      console.log('导入成功', results, header)
      this.loading = true
      try {
        this.tableData = results
        // this.tableHeader = header
        const newData = this.tableData.map(item => {
          const newItem = {}
          Object.keys(item).forEach(el => {
            newItem[this.objEnum[el]] = item[el]
          })
          return newItem
        })
        console.log('处理过后的data', newData)
        this.newData = newData
        const res = await Excel.VILLAGER_MANAGER_ADD_BATCH(newData)
        this.errorData = res
        this.loading = false
        if (!res.length) {
          this.$message({
            message: `成功上传${newData.length}条居民信息!`,
            type: 'success'
          })
        }
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>
