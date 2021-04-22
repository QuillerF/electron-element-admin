<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <span>本软件属于荆王村村民信息管理系统， 主要用户为荆王村村委会领导以及各个队长，
      村长一级领导拥有所有数据权限，队长拥有所在队的数据权限。 软件包含村民数据列表展示，并能够对相应数据进行增删改查，
      迁入，迁出以及注销等操作。</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
</style>
