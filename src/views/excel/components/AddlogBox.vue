<!-- 信息录入 -->
<template>
  <div class="addlog">
    <div v-if="viewType === 'view'" class="mask"></div>
    <!-- <div v-if="viewType === 'view'" class="flex-ar mb20"> -->
    <el-form ref="form" :model="form" :rules="rules" label-width="200px" :inline="true" size="mini">
      <div v-if="isApply">
        <h3>审核情况</h3>
        <el-form-item label="审核状态:">
          <span>{{ getApproveStatus }}</span>
        </el-form-item>
        <el-form-item label="操作类型:">
          <span>{{ detail.operationType }}</span>
        </el-form-item>
      </div>
      <h3>个人信息</h3>
      <el-form-item v-for="item in personalColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" :value="formatValue(item.prop)" @change="handleChange"></AddLogItem>
      </el-form-item>
      <div></div>
      <el-form-item v-for="item in addressColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" :value="formatValue(item.prop)" @change="handleChange"></AddLogItem>
      </el-form-item>
      <div>
        <el-form-item
          v-for="(item, index) in addlogItems"
          :key="index + 'idcard'"
          :prop="item.prop"
          :label="item.label"
        >
          <UploadImages
            :item="item"
            :limit="1"
            :src="formatImages(item.prop)"
            :view-type="viewType"
            @uploadImage="handleChangeImg"
          ></UploadImages>
        </el-form-item>
      </div>
      <h3>家庭信息</h3>
      <el-form-item v-for="item in familyColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" :value="formatValue(item.prop)" @change="handleChange"></AddLogItem>
      </el-form-item>
      <h3>其他信息</h3>
      <el-form-item v-for="item in otherColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" :value="formatValue(item.prop)" @change="handleChange"></AddLogItem>
      </el-form-item>
      <h3 v-if="viewType === 'view' && !isApply">家庭成员列表</h3>
      <el-table
        v-if="viewType === 'view' && !isApply"
        :data="otherFamily"
        class="table"
        align="center"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" align="center" label="姓名"> </el-table-column>
        <el-table-column prop="hhRegistryNo" align="center" label="户号"> </el-table-column>
        <el-table-column prop="groupName" align="center" label="村组"> </el-table-column>
        <el-table-column prop="idCardNo" align="center" label="身份证号"> </el-table-column>
        <el-table-column prop="phone" align="center" label="联系方式"> </el-table-column>
        <el-table-column prop="hhRegistryMaster" align="center" label="户主"> </el-table-column>
        <el-table-column prop="hhRelation" align="center" label="与户主关系"> </el-table-column>
        <el-table-column prop="prop" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="default" @click="toDetail(scope.row, 'view')">详情</el-button>
            <el-button type="text" size="default" @click="toDetail(scope.row, 'edit')">修改</el-button>
            <el-button type="text" size="default" @click="toDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex-ac mt20">
        <el-button v-if="viewType === 'edit'" type="primary" style="width:100px" @click="onSubmit">提交</el-button>
        <el-button v-if="viewType === 'add'" type="primary" style="width:100px" @click="onSubmitAdd">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Excel from '@/api/excel'
import Admin from '@/api/admin'
import { Columns, addlogItems } from '../Enum'
import AddLogItem from './AddLogItem'
import UploadImages from './UploadImages'

const viewStatus = {
  view: '查看记录',
  edit: '修改记录',
  add: '添加记录'
}

export default {
  components: { AddLogItem, UploadImages },
  props: {
    viewType: {
      type: String,
      default: 'add'
    },
    isApply: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {}
    },
    otherFamily: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: Columns.filter(item => item.addtype),
      addlogItems,
      list: [],
      form: {},
      rules: {},
      groups: []
    }
  },
  computed: {
    personalColumns() {
      const keys = [
        'name',
        'gender',
        'idCardNo',
        'phone',
        'birthday',
        'insurance',
        'groupName',
        'nation',
        'marriage',
        'military',
        'politicalStatus',
        'religion',
        'wordType',
        'isOnlyChild',
        'education'
      ]
      return this.columns.filter(item => keys.includes(item.prop))
    },
    addressColumns() {
      const keys = ['residenceAddress', 'residentialAddress']
      return this.columns.filter(item => keys.includes(item.prop))
    },
    familyColumns() {
      const keys = [
        'hhRegistryNo',
        'houseHolderName',
        'hhRelation',
        'familyIncome',
        'isPoverty',
        'isLowIncome',
        'isFiveGuarantee',
        'isMilitaryFamily',
        'farmlandMu',
        'farmlandRemark'
      ]
      return this.columns.filter(item => keys.includes(item.prop))
    },
    otherColumns() {
      // const keys = this.form.isMoveIn === '是' ? ['isMoveIn', 'moveInReason', 'remark'] : ['isMoveIn', 'remark']
      const keys = 'remark'
      return this.columns.filter(item => keys.includes(item.prop))
    },
    getApproveStatus() {
      const role = this.$store.state.user.token
      const status = this.detail.approveStatus
      if (status === 3) return '已驳回'
      if (status === 1) {
        return role === 'group' ? '审核中' : '待审核'
      }
      return '已通过'
    }
  },
  watch: {
    detail: {
      handler(val) {
        Object.assign(this.form, val)
      },
      immediate: true
    }
  },
  async created() {
    await this.getGroup()
    this.formatRules()
  },

  methods: {
    async getGroup() {
      if (this.$store.state.user.token === 'group') {
        this.formatGroup()
        return
      }
      const res = await Admin.ADMIN_GROUPS()
      this.groups = res
      this.formatGroup()
    },
    formatValue(prop) {
      return this.form ? this.form[prop] : ''
    },
    formatImages(prop) {
      return this.form ? this.form[prop] : ''
    },
    // toDetail(row, type = 'readonly') {
    //   this.$router.push({ path: '/excel/addlog', params: { row, type } })
    // },
    toDelete(row) {
      this.$confirm('确认删除该条信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.VILLAGER_MANAGER_DELETE(row.id)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchDataDebounce()
        })
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

    handleChange(vals = []) {
      const [prop, val] = vals
      console.log(prop, val)
      this.$set(this.form, prop, val)
    },
    handleChangeImg(vals = []) {
      const [prop, val] = vals
      console.log(prop, val)
      this.$set(this.form, prop, val)
    },
    onSubmit() {
      this.$refs.form.validate(async bool => {
        if (bool) {
          console.log(this.form)
          const params = { ...this.detail, ...this.form }
          await Excel.VILLAGER_MANAGER_UPDATE_ONE(params)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      })
    },
    onSubmitAdd() {
      this.$refs.form.validate(async bool => {
        if (bool) {
          console.log(this.form)
          const params = { ...this.form, ...{ groupId: this.form.groupName } }
          await Excel.VILLAGER_MANAGER_ADD_ONE(params)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
    },
    formatRules() {
      const obj = {}
      const allrules = this.columns.forEach(item => {
        const rules = item.required ? [{ required: true, message: `请输入${item.label}`, trigger: 'blur' }] : []
        if (item.rules) {
          rules.push(...item.rules)
        }
        obj[item.prop] = rules
      })
      this.rules = obj
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    formatGroup() {
      const index = this.columns.findIndex(item => item.prop === 'groupName')
      if (index < 0) return
      if (this.$store.state.user.token === 'group') {
        this.columns[index].options = [
          {
            label: this.$store.state.user.userInfo.groupName,
            value: this.$store.state.user.userInfo.groupId
          }
        ]
      } else {
        this.columns[index].options = this.groups.map(item => ({
          label: item.groupName,
          value: item.groupId
        }))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addlog {
  position: relative;
  padding: 20px;
  .mask {
    z-index: 1000;
    cursor: not-allowed;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .table {
    z-index: 1001;
  }
}
h3 {
  padding-left: 200px;
}
</style>
