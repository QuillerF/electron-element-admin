<!-- 信息录入 -->
<template>
  <div class="addlog">
    <el-form ref="form" :model="form" label-width="auto" :inline="true" size="mini">
      <el-form-item
        v-for="(item, index) in columns"
        :key="index"
        :required="item.required"
        :prop="item.prop"
        :label="item.label"
        :rules="formatRules(item)"
      >
        <AddLogItem :item="item" @change="change"></AddLogItem>
      </el-form-item>
      <div class="flex-ac">
        <el-button type="primary" style="width:100px" @click="onSubmit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Columns } from './Enum'
import AddLogItem from './components/AddLogItem'

export default {
  components: { AddLogItem },
  props: {},
  data() {
    return {
      columns: Columns.filter(item => item.addtype),
      form: {}
    }
  },
  computed: {},
  created() {},
  methods: {
    change(val, prop) {
      this.form[prop] = val
    },
    onSubmit() {
      this.$refs.form.validate(async bool => {
        if (bool) {
          console.log(this.form)
        }
      })
    },
    formatRules(item) {
      return { required: true, message: `请输入${item.label}` }
    }
  }
}
</script>

<style lang="scss" scoped>
.addlog {
  padding: 20px;
}
</style>
