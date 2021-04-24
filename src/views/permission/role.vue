<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="handleAddRole">添加成员</el-button>

    <el-table
      v-table-height="{ bottomOffset: 50 }"
      height="100px"
      :data="list"
      empty-text="暂无数据"
      style="width: 100%;margin-top:30px;"
      border
    >
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据权限">
        <template slot-scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
          <el-button type="text" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" width="500px" :title="dialogType === 'edit' ? '修改成员信息' : '添加成员'">
      <el-form :model="form" label-width="80px" label-position="left">
        <el-form-item label="登录账号">
          <el-input v-model="form.username" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.nickname" placeholder="名称" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option v-for="ritem in roles" :key="ritem.roleId" :label="ritem.roleName" :value="ritem.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.roleId === 'group'" label="权限范围">
          <el-radio-group v-model="form.groupId">
            <el-radio v-for="gitem in groups" :key="gitem.groupId" :label="gitem.groupId" style="margin-bottom:20px">{{
              gitem.groupName
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import Admin from '@/api/admin'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      dialogType: 'new',
      form: {
        groupId: '',
        nickname: '',
        phone: '',
        roleId: '',
        username: ''
      },
      groups: [],
      roles: []
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getData()
    this.getRoles()
    this.getGroups()
  },
  methods: {
    async getRoles() {
      const roles = await Admin.ADMIN_ROLES()
      this.roles = roles || []
    },
    async getGroups() {
      const groups = await Admin.ADMIN_GROUPS()
      this.groups = groups || []
    },
    async getData() {
      const res = await Admin.ADMIN_USER_LIST()
      this.list = res
    },

    resetPassword(row) {
      this.$confirm(`确定要为${row.username}这个账号重置密码吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Admin.ADMIN_RESET_PWD(row.id)
          this.$message({
            message: '重置成功',
            type: 'success'
          })
        })
        .catch(() => {})
    },

    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.form = {
        groupId: row.groupId,
        nickname: '',
        phone: '',
        roleId: '',
        username: ''
      }
    },

    handleDelete({ $index, row }) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Admin.ADMIN_USER_DELETE(row.id)
          this.getData()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    async confirmRole() {
      await Admin.ADMIN_ADD_USER(this.form)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.getData()
      this.dialogVisible = false
      this.form = {
        groupId: '',
        nickname: '',
        phone: '',
        roleId: '',
        username: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
