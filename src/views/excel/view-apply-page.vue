<!-- 修改记录 -->
<template>
  <div>
    <div class="flex-ar mb20 mt20">
      <el-button v-if="role !== 'group'" type="primary" size="mini" class="mr20" @click="handleApply(detail, 2)"
        >驳回</el-button
      >
      <el-button v-if="role !== 'group'" type="success" size="mini" class="mr20" @click="handleApply(detail, 1)"
        >通过审核</el-button
      >
      <el-button
        v-if="role === 'group' && detail.approveStatus === 1"
        type="primary"
        size="mini"
        class="mr20"
        @click="toReturn"
        >撤回</el-button
      >
      <el-button
        v-if="role === 'group' && detail.approveStatus === 3"
        type="danger"
        size="mini"
        class="mr20"
        @click="toDelete"
        >删除</el-button
      >
    </div>

    <AddlogBox :detail="detail" :view-type="viewType" is-apply> </AddlogBox>
    <moveoutDialog ref="move"></moveoutDialog>
  </div>
</template>

<script>
import Excel from '@/api/excel'
import AddlogBox from './components/AddlogBox'
import moveoutDialog from './components/moveoutDialog'

export default {
  components: { AddlogBox, moveoutDialog },
  props: {},
  data() {
    return {
      viewType: 'view',
      detail: {},
      id: '',
      role: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    const { id, viewType } = this.$route.query
    this.viewType = viewType
    this.getData(id)
    this.id = id
    this.role = this.$store.state.user.token
  },
  methods: {
    closeSelectedTag() {
      const view = this.$route
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        this.$router.push('/excel')
      }
    },
    async getData(id) {
      const res = await Excel.APPROVE_DETAIL(id)
      this.detail = res
    },
    toReturn() {
      this.$confirm('确认撤回吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_CANCEL(this.detail.id)
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.closeSelectedTag()
        })
        .catch(() => {})
    },
    handleApply(row, status) {
      const txt = status === 1 ? '通过审核' : '驳回'
      this.$confirm(`确定${txt}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_HANDLE({ approveId: row.id, type: status })
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.closeSelectedTag()
        })
        .catch(() => {})
    },
    toDelete() {
      this.$confirm('确认删除此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.APPROVE_DELETE(this.detail.id)
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.closeSelectedTag()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
