<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const doSomething = e => {
  // console.log(e)
  if (e.code === 'F5') {
    location.reload()
  }
}
window.addEventListener('keydown', doSomething, true)
export default {
  name: 'App'
}
</script>
