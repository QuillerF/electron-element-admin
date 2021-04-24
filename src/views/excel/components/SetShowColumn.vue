<!-- 此处写注释 -->
<template>
  <div>
    <el-checkbox-group v-model="checkList" @change="checkChange">
      <el-checkbox v-for="item in columns" :key="item.prop" :label="item.prop">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Columns } from '../Enum'

export default {
  components: {},
  props: {
    realColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: Columns,
      checkList: []
    }
  },
  computed: {},
  created() {
    this.checkList = this.realColumns.map(item => item.prop)
  },
  methods: {
    checkChange() {
      const newroles = this.columns.filter(item => this.checkList.includes(item.prop))
      this.$emit('change', newroles)
    }
  }
}
</script>

<style lang="scss" scoped></style>
