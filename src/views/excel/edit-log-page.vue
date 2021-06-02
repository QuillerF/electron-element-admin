<!-- 修改记录 -->
<template>
  <div>
    <AddlogBox :detail="detail" :view-type="viewType" @close="closeSelectedTag"></AddlogBox>
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
      detail: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    const { id, viewType } = this.$route.query
    this.viewType = viewType
    this.getData(id)
  },
  methods: {
    async getData(id) {
      const { source } = await Excel.VILLAGER_MANAGER_DETAIL(id)
      this.detail = source
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
    toEdit() {
      this.$router.push('/excel/edit-log-page')
    },

    toDelete() {
      this.$confirm('确认删除此信息吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('删除')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
