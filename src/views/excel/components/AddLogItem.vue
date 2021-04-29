<!-- 添加记录 -->
<template>
  <div>
    <el-date-picker
      v-if="item.addtype === 'date'"
      v-model="date"
      type="date"
      style="width:200px"
      placeholde="请选择日期"
      @change="valueChange(date)"
    ></el-date-picker>
    <el-input
      v-else-if="item.addtype === 'text'"
      v-model="text"
      style="width:200px"
      :placeholder="item.placeholder"
      clearable
      @blur="valueChange(text)"
    ></el-input>
    <el-input
      v-else-if="item.addtype === 'textarea'"
      v-model="textarea"
      :placeholder="item.placeholder"
      :rows="3"
      type="textarea"
      resize="none"
      style="width:200px"
      clearable
      @blur="valueChange(textarea)"
    ></el-input>
    <el-select v-else v-model="select" style="width:200px" clearable @change="valueChange(select)">
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
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [String, Array, Object, Number],
      default: ''
    }
  },
  data() {
    return {
      text: '',
      textarea: '',
      date: '',
      select: ''
    }
  },
  computed: {},
  watch: {
    value(val) {
      this.text = val
      this.textarea = val
      this.date = val
      this.select = val
      this.$emit('change', [this.item.prop, val])
    }
  },
  created() {},
  methods: {
    valueChange(val) {
      this.$emit('change', [this.item.prop, val])
    }
  }
}
</script>

<style lang="scss" scoped></style>
