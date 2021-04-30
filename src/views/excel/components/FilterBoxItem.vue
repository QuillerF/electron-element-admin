<!-- 筛选框单项 -->
<template>
  <div>
    <el-date-picker
      v-if="item.type === 'daterange'"
      v-model="daterange"
      type="daterange"
      start-placeholde="开始日期"
      end-placeholde="结束日期"
      @change="handleChange(daterange)"
    ></el-date-picker>
    <div v-else-if="item.type === 'numrange'">
      <el-input-number
        v-model="min"
        :min="0"
        :max="max || 9999"
        :step="1"
        :controls="false"
        placeholder="不限"
        controls-position="both"
        @change="numRangeChange"
      >
      </el-input-number>
      <span class="mr20 ml20">至</span>
      <el-input-number
        v-model="max"
        :min="min || 0"
        :max="9999"
        :step="1"
        :controls="false"
        placeholder="不限"
        controls-position="both"
        @change="numRangeChange"
      >
      </el-input-number>
    </div>
    <el-select
      v-else-if="item.isMutiple"
      v-model="values"
      :multiple="item.isMutiple"
      collapse-tags
      placeholder="不限"
      clearable
      @change="handleChange(values)"
    >
      <el-option
        v-for="(op, index) in item.options"
        :key="index"
        :label="op.label"
        :value="op.value || op.label"
      ></el-option>
    </el-select>
    <el-select v-else v-model="value" placeholder="不限" clearable @change="handleChange">
      <el-option
        v-for="(op, index) in item.options"
        :key="index"
        :label="op.label"
        :value="op.value || op.label"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      value: '',
      values: [],
      daterange: [],
      min: '',
      max: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleChange(value) {
      const { prop } = this.item
      this.$emit('change', { prop, value })
    },
    numRangeChange() {
      const { prop } = this.item
      const value = [this.min, this.max]
      this.$emit('change', { prop, value })
    }
  }
}
</script>

<style lang="scss" scoped></style>
