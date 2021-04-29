<!-- 迁出弹窗 -->
<template>
  <el-dialog :title="type === 'out' ? '迁出群众' : '注销群众'" :visible.sync="visible" center width="400px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini" :inline="false">
      <el-form-item :label="type === 'out' ? '迁出原因' : '注销原因'" prop="reason">
        <el-select v-model="form.reason" value-key="" placeholder="" style="width:220px" clearable filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value || item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker v-model="form.date" type="date" style="width:220px" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入"
          :rows="3"
          show-word-limit
          maxlength="200"
          type="textarea"
          resize="none"
          style="width:220px"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button size="mini" class="mr20" @click="visible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      type: 'out', // out cancel
      form: {
        reason: '',
        date: '',
        remark: ''
      },
      rules: {
        reason: { required: true, message: '请选择原因' },
        date: { required: true, message: '请选择原因' }
      },
      options: [
        {
          label: '死亡'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    openDialog(type) {
      this.type = type
      this.visible = true
    },
    submit() {
      this.$refs.form.validate(async bool => {
        if (bool) {
          console.log('submit')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
