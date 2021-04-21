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
      <el-form-item label="原密码:" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码:" prop="checkPassword">
        <el-input v-model="form.checkPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { cloneDeep } from 'lodash'

export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        password: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        password: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        checkPassword: [{ required: true, message: '请再次输入新密码', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 接口请求
          const params = this.codeForm
          const res = await this.$http.login.AUTH_LOGIN_CODE(params)
          this.orgList = res.orgList
          this.codeVerifyForm.verifyStr = res.verifyStr
          if (res.orgList.length === 1) {
            const [org] = res.orgList
            this.codeVerifyForm.id = org.id
            this.toVerifyLogin()
          }
          console.log(res)
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
