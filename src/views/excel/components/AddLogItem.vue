<!-- 添加记录 -->
<template>
  <div>
    <el-date-picker v-if="item.addtype === 'date'" v-model="date" type="date" placeholde="请选择日期"></el-date-picker>
    <el-input v-else-if="item.addtype === 'text'" v-model="text" :placeholder="item.placeholder" clearable></el-input>
    <el-input
      v-else-if="item.addtype === 'textarea'"
      v-model="textarea"
      :placeholder="item.placeholder"
      :rows="4"
      type="textarea"
      resize="none"
      clearable
    ></el-input>
    <div v-else-if="item.addtype === 'upload'">
      <UploadImages :limit="1"></UploadImages>
    </div>
    <el-select v-else v-model="select" clearable>
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
import UploadImages from './UploadImages'

export default {
  components: { UploadImages },
  props: {
    item: {
      type: Object,
      default: () => {}
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
  watch: {},
  created() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped></style>
