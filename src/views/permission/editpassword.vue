<!-- 修改密码 -->
<template>
  <div class="container flex-ac">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      :inline="false"
      style="width:500px"
      size="normal"
    >
      <el-form-item label="原密码:" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="checkPassword">
        <el-input v-model="form.checkPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { cloneDeep } from 'lodash'
import Admin from '@/api/admin'
import RegExp from '@/utils/RegExp'

export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        userId: this.$store.state.user.userInfo.userId,
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: RegExp.numberLetter, message: '密码只能输入大写字母,小写字母,数字' },
          { min: 6, max: 16, message: '6-16位', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 第四步骤
    validatePass(_rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 接口请求
          try {
            this.loading = true
            const params = this.form
            const res = await Admin.USER_UPDATE_PWD(params)
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$store.dispatch('user/logout')
            this.$router.push('/login')
            this.lading = false
            console.log(res)
          } catch (error) {
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/flex.scss';
.container {
  padding-top: 50px;
}
</style>
