<!-- 迁出弹窗 -->
<template>
  <el-dialog :title="`${getTitle}群众`" :visible.sync="visible" center width="400px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini" :inline="false">
      <el-form-item :label="`${getTitle}原因`" prop="reason">
        <el-select v-model="form.reason" placeholder="" style="width:220px" clearable filterable>
          <el-option v-for="item in getOptions" :key="item.label" :label="item.label" :value="item.value || item.label">
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
import Excel from '@/api/excel'

export default {
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      type: 'out', // out cancel
      form: {
        villagerId: '',
        idCardNo: '',
        name: '',
        date: '',
        reason: '',
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
  computed: {
    getTitle() {
      const obj = {
        out: '迁出',
        in: '迁入',
        cancel: '注销'
      }
      return obj[this.type]
    },
    getOptions() {
      switch (this.type) {
        case 'in':
          return [{ label: '嫁娶' }, { label: '收留' }]
        case 'cancel':
          return [{ label: '死亡' }]
        default:
          return [{ label: '求学' }, { label: '嫁娶' }]
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    openDialog(type, detail = {}) {
      this.type = type
      this.form.villagerId = detail.id
      this.form.idCardNo = detail.idCardNo || ''
      this.form.name = detail.name
      this.form.date = ''
      this.form.reason = ''
      this.form.remark = ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    submit() {
      this.$refs.form.validate(async bool => {
        if (bool) {
          switch (this.type) {
            case 'in':
              await Excel.VILLAGER_MANAGER_VILLAGER_MOVE_IN(this.form)
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              break
            case 'out':
              await Excel.VILLAGER_MANAGER_VILLAGER_MOVE_OUT(this.form)
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              break
            case 'cancel':
              await Excel.VILLAGER_MANAGER_VILLAGER_MOVE_OUT_FOREVER(this.form)
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              break
            default:
              console.log('error')
              break
          }
          this.visible = false
          this.$emit('close')
          console.log('submit')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
