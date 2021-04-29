<!-- 筛选框 -->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" :inline="true" size="mini">
      <el-form-item v-for="(item, index) in columns" :key="item.prop + index" :label="item.label">
        <FilterBoxItem :item="item" @change="valueChange"></FilterBoxItem>
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
      form: {}
    }
  },
  computed: {
    columns() {
      const arr = Columns.filter(item => item.isFilter)
      if (this.$store.state.user.token === 'super-admin') {
        return arr
      }
      return arr.filter(item => item.prop !== 'groupName')
    }
  },
  created() {},
  methods: {
    valueChange({ prop, value }) {
      this.form[prop] = value
    },
    onSubmit() {
      this.$emit('change', cloneDeep(this.form))
    }
  }
}
</script>

<style lang="scss" scoped></style>
