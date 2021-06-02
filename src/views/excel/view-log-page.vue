<!-- 修改记录 -->
<template>
  <div>
    <div class="flex-ar mb20 mt20">
      <el-button type="primary" size="mini" class="mr20" @click="toEdit">修改</el-button>
      <el-button
        v-show="detail.isMoveIn === '否'"
        v-permission="['super-admin', 'admin']"
        type="primary"
        size="mini"
        class="mr20"
        @click="handleMove('in')"
        >迁入</el-button
      >
      <el-button type="primary" size="mini" class="mr20" @click="handleMove('out')">迁出</el-button>
      <el-button type="warning" size="mini" class="mr20" @click="handleMove('cancel')">注销</el-button>
      <el-button type="danger" size="mini" class="mr20" @click="toDelete(detail)">删除</el-button>
    </div>
    <AddlogBox :detail="detail" :other-family="otherFamily" :view-type="viewType" @close="closeSelectedTag"></AddlogBox>
    <moveoutDialog ref="move" @close="closeSelectedTag"></moveoutDialog>
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
      otherFamily: [],
      id: ''
    }
  },
  computed: {},
  watch: {
    $route: {
      handler(val) {
        const { id } = this.$route.query
        this.getData(id)
        this.id = id
      },
      deep: true
    }
  },
  created() {
    const { id, viewType } = this.$route.query
    this.viewType = viewType
    this.getData(id)
    this.id = id
  },
  methods: {
    async getData(id) {
      const { otherFamily, source } = await Excel.VILLAGER_MANAGER_DETAIL(id)
      this.detail = source
      this.otherFamily = otherFamily
    },
    toEdit() {
      this.$router.push({ path: '/excel/editlog', query: { id: this.detail.id, viewType: 'edit' } })
    },
    handleMove(type) {
      this.$refs.move.openDialog(type, this.detail)
    },
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
    toDelete(row) {
      this.$confirm('确认删除该条信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await Excel.VILLAGER_MANAGER_DELETE(row.id)
          this.$message({
            message: '删除成功',
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
