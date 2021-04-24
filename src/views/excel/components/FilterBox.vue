<!-- 此处写注释 -->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" :inline="true" size="mini">
      <el-form-item v-for="item in columns" :key="item.prop" :label="item.label">
        <FilterBoxItem :item="item"></FilterBoxItem>
      </el-form-item>
      <div class="flex-ac">
        <el-button type="primary" style="width:100px" @click="onSubmit">搜索</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Columns } from '../Enum'
import FilterBoxItem from './FilterBoxItem'

export default {
  components: { FilterBoxItem },
  props: {},
  data() {
    return {
      columns: Columns.filter(item => item.isFilter),
      form: {}
    }
  },
  computed: {},
  created() {},
  methods: {
    onSubmit() {
      const newroles = this.columns.filter(item => this.checkList.includes(item.prop))
      this.$emit('change', newroles)
    }
  }
}
</script>

<style lang="scss" scoped></style>
