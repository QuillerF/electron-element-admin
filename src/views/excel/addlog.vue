<!-- 添加记录 -->
<template>
  <div class="addlog">
    <h3>个人信息</h3>
    <el-form ref="form" :model="form" :inline="true" size="mini" label-width="auto">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="">
          <el-option label="男"> </el-option>
          <el-option label="女"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idcard">
        <el-input v-model="form.idcard" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="name">
        <el-date-picker v-model="form.birth" type="date" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="参保情况" prop="name">
        <el-select v-model="form.sex" placeholder="">
          <el-option label="男"> </el-option>
          <el-option label="女"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组别" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="兵役情况" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="政治面貌" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="宗教信仰" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="独生子女" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="户籍地址" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证正面" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="身份证反面" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="户口本本人页" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="户口本户主页" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <h3>家庭信息</h3>
      <el-form-item label="户号" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="户主" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="与户主关系" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="家庭年收入" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="贫困家庭" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="低保户" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="五保户" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="军属家庭" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="耕地(亩)" prop="name">
        <el-input v-model="form.name" placeholder="2-10位汉字" clearable></el-input>
      </el-form-item>
      <el-form-item label="耕地备注" prop="name">
        <el-input v-model="form.name" placeholder="至多200个字" clearable></el-input>
      </el-form-item>
      <h3>其他</h3>
      <el-form-item label="是否为迁入" prop="name">
        <el-input v-model="form.name" placeholder="至多200个字" clearable></el-input>
      </el-form-item>
      <el-form-item label="迁入原因" prop="name">
        <el-input v-model="form.name" placeholder="至多200个字" clearable></el-input>
      </el-form-item>
      <el-form-item label="迁入备注" prop="name">
        <el-input v-model="form.name" placeholder="至多200个字" clearable></el-input>
      </el-form-item>
      <div class="flex-ac mt20">
        <el-button type="success" size="default" style="width:200px" @click="submit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    submit() {
      console.log('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.addlog {
  padding: 20px;
}
</style>
