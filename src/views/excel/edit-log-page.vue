<!-- 修改记录 -->
<template>
  <div>
    <AddlogBox :detail="detail" :view-type="viewType"></AddlogBox>
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
    toEdit() {
      this.$router.push('/excel/edit-log-page')
    },
    toOut() {
      this.$refs.move.openDialog('out')
      // this.$confirm('确认迁出此信息吗?', '提示', {
      //   confirmButtonText: '确认',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     console.log('迁出')
      //   })
      //   .catch(() => {})
    },
    toCancel() {
      this.$refs.move.openDialog('cancel')
      // this.$confirm('确认注销此信息吗?', '提示', {
      //   confirmButtonText: '确认',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     console.log('注销')
      //   })
      //   .catch(() => {})
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
