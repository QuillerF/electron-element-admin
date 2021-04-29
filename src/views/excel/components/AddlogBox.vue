<!-- 信息录入 -->
<template>
  <div class="addlog">
    <!-- <div v-if="viewType === 'view'" class="flex-ar mb20"> -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="viewType === 'view'"
      label-width="200px"
      :inline="true"
      size="mini"
    >
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
          <UploadImages :item="item" :limit="1" :value="formatValue(item.prop)" @change="handleChange"></UploadImages>
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
      <h3>家庭成员列表</h3>
      <el-table :data="list" align="center" border style="width: 100%">
        <el-table-column prop="prop" align="center" label="姓名"> </el-table-column>
        <el-table-column prop="prop" align="center" label="户号"> </el-table-column>
        <el-table-column prop="prop" align="center" label="村组"> </el-table-column>
        <el-table-column prop="prop" align="center" label="身份证号"> </el-table-column>
        <el-table-column prop="prop" align="center" label="联系方式"> </el-table-column>
        <el-table-column prop="prop" align="center" label="户主"> </el-table-column>
        <el-table-column prop="prop" align="center" label="与户主关系"> </el-table-column>
        <el-table-column prop="prop" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="default" @click="toDetail(scope.row)">详情</el-button>
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
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: Columns.filter(item => item.addtype),
      addlogItems,
      list: [],
      form: {},
      rules: {}
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
        'farmlandMu'
      ]
      return this.columns.filter(item => keys.includes(item.prop))
    },
    otherColumns() {
      const keys = this.form.isMoveIn === '是' ? ['isMoveIn', 'moveInReason', 'remark'] : ['isMoveIn', 'remark']
      return this.columns.filter(item => keys.includes(item.prop))
    }
  },
  watch: {},
  created() {
    this.getGroup()
  },
  methods: {
    async getGroup() {
      const res = Admin.ADMIN_GROUPS()
      this.groups = res
      this.formatRules()
    },
    formatValue(prop) {
      return this.detail ? this.detail[prop] : ''
    },
    toDetail(row, type = 'readonly') {
      this.$router.push({ path: '/excel/addlog', params: { row, type } })
    },

    handleChange(vals = []) {
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
        if (item.prop === 'groupName') {
          item.options = [
            {
              label: this.$store.state.user.userInfo.groupName,
              value: this.$store.state.user.userInfo.groupId
            }
          ]
        }
      })
      this.rules = obj
    }
  }
}
</script>

<style lang="scss" scoped>
.addlog {
  padding: 20px;
}
h3 {
  padding-left: 200px;
}
</style>
