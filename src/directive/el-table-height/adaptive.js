/**
 * 如何使用
 * <el height="100px" v-el-height-adaptive-table="{bottomOffset: 30}">...</el>
 * el height 属性必须被设置
 * bottomOffset: 30(default)   // 元素底部距离页面底边的高度
 * top: 0(default)   // 元素底部距离页面顶边的高度,如果不传将自动计算,(可以传动态,当页面里有筛选框的时候)
 */

const doResize = (el, binding, vnode) => {
  const { componentInstance: $table } = vnode
  const { value = {} } = binding
  const { top = 0 } = value
  const bottomOffset = (value && value.bottomOffset) || 30
  let autoTop = Math.floor(el.getBoundingClientRect().top)
  if (autoTop > window.innerHeight) {
    autoTop = Math.floor(autoTop - window.innerHeight + 58 + Number(window.getComputedStyle(el).marginTop.slice(0, -2)))
  }
  const height = `calc(100vh - ${bottomOffset}px - ${top || autoTop}px)`
  if (!$table.height) {
    throw new Error(`el-$table must set the height. Such as height='100px'`)
  }
  if (!$table) return
  // console.log('$table', $table)
  $table.layout.setHeight(height)
  $table.doLayout()
  el.style.transition = 'height 0.5s'
}

export default {
  inserted(el, binding, vnode) {
    const { context } = vnode
    context.$nextTick(() => {
      doResize(el, binding, vnode)
      // setTimeout(() => {}, 150)
    })
  },
  componentUpdated(el, binding, vnode) {
    const { value = {}, oldValue = {} } = binding
    if (value.top > 0 && value.top !== oldValue.top) {
      doResize(el, binding, vnode)
    }
  }
}
