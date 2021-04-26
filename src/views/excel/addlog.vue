<!-- 信息录入 -->
<template>
  <div class="addlog">
    <div v-if="viewType === 'view'" class="flex-ar mb20">
      <el-button type="primary" size="mini" class="mr20" @click="toEdit">修改</el-button>
      <el-button type="primary" size="mini" class="mr20" @click="toOut">迁出</el-button>
      <el-button type="warning" size="mini" class="mr20" @click="toCancel">注销</el-button>
      <el-button type="danger" size="mini" class="mr20" @click="toDelete">删除</el-button>
    </div>
    <el-form ref="form" :model="form" :rules="rules" :disabled="isView" label-width="200px" :inline="true" size="mini">
      <el-form-item v-for="(item, index) in columns" :key="index" :prop="item.prop" :label="item.label">
        <AddLogItem :item="item" @change="handleChange"></AddLogItem>
      </el-form-item>
      <el-form-item v-for="(item, index) in addlogItems" :key="index + 'idcard'" :prop="item.prop" :label="item.label">
        <UploadImages></UploadImages>
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
    const { viewType } = this.$route.query
    this.$route.meta.title = viewStatus[viewType] || '添加记录'
    return {
      columns: Columns.filter(item => item.addtype),
      addlogItems,
      form: {},
      rules: {},
      viewType
    }
  },
  computed: {},
  created() {
    this.formatRules()
  },
  methods: {
    toEdit() {},
    toOut() {},
    toCancel() {},
    toDelete() {},
    handleChange(prop, val) {
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
</style>
