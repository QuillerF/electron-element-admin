<!-- 信息录入 -->
<template>
  <div class="addlog">
    <div v-if="viewType === 'view'" class="flex-ar mb20">
      <el-button type="primary" size="mini" class="mr20" @click="toEdit">修改</el-button>
      <el-button type="primary" size="mini" class="mr20" @click="toOut">迁出</el-button>
      <el-button type="warning" size="mini" class="mr20" @click="toCancel">注销</el-button>
      <el-button type="danger" size="mini" class="mr20" @click="toDelete">删除</el-button>
    </div>
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
        <AddLogItem :item="item" @change="handleChange"></AddLogItem>
      </el-form-item>
      <div></div>
      <el-form-item v-for="item in addressColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" @change="handleChange"></AddLogItem>
      </el-form-item>
      <div>
        <el-form-item
          v-for="(item, index) in addlogItems"
          :key="index + 'idcard'"
          :prop="item.prop"
          :label="item.label"
        >
          <UploadImages></UploadImages>
        </el-form-item>
      </div>
      <h3>家庭信息</h3>
      <el-form-item v-for="item in familyColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" @change="handleChange"></AddLogItem>
      </el-form-item>
      <h3>其他信息</h3>
      <el-form-item v-for="item in otherColumns" :key="item.prop" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" @change="handleChange"></AddLogItem>
      </el-form-item>

      <div class="flex-ac">
        <el-button type="primary" style="width:100px" @click="onSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Columns, addlogItems } from './Enum'
import AddLogItem from './components/AddLogItem'
import UploadImages from './components/UploadImages'

const viewStatus = {
  view: '查看记录',
  edit: '修改记录',
  add: '添加记录'
}

export default {
  components: { AddLogItem, UploadImages },
  props: {},
  data() {
    const { viewType = 'view' } = this.$route.query
    this.$route.meta.title = viewStatus[viewType] || '添加记录'
    return {
      columns: Columns.filter(item => item.addtype),
      addlogItems,
      form: {},
      rules: {},
      viewType
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
  watch: {
    viewType(val) {
      this.$route.meta.title = viewStatus[val] || '添加记录'
    }
  },
  created() {
    this.formatRules()
  },
  methods: {
    toEdit() {
      this.viewType = 'edit'
    },
    toOut() {
      this.$confirm('确认迁出此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('迁出')
        })
        .catch(() => {})
    },
    toCancel() {
      this.$confirm('确认注销此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('注销')
        })
        .catch(() => {})
    },
    toDelete() {
      this.$confirm('确认删除此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除')
        })
        .catch(() => {})
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
        }
      })
    },
    formatRules() {
      const obj = {}
      const allrules = this.columns.forEach(item => {
        const rules = item.required ? [{ required: true, message: `请输入${item.label}` }] : []
        if (item.rules) {
          rules.push(...item.rules)
        }
        obj[item.prop] = rules
      })
      console.log('rules', obj)
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
