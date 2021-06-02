import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from 'vue-router'
import { getToken } from '@/utils/auth'

// 删除空参数
const filterParam = obj => {
  if (obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        filterParam(obj[key]) // 递归遍历
      }
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim()
      }
      if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
        delete obj[key]
      }
    }
  }
  return obj
}
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    filterParam(config.params || config.data)
    // do something before request is sent
    console.log('请求参数:', config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log('响应参数:', response)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (response.status === 401) {
        // to re-login
        MessageBox.confirm('登录已失效,请重新登录', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const { status } = res
      // if (status === 401) {
      //   store.dispatch('user/logout')
      //   router.push(`/login?redirect=${this.$route.fullPath}`)
      // } else
      if (status !== 0) {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res.data || res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.message === 'Network Error') {
      Message({
        type: 'error',
        message: '网络错误',
        showClose: true
      })
    } else if (error.message === 'timeout of 30000ms exceeded') {
      Message({
        type: 'error',
        message: '网络不佳，请求超时',
        showClose: true
      })
    } else {
      Message({
        type: 'error',
        message: '服务器请求错误',
        showClose: true
      })
    }

    return Promise.reject(error)
  }
)

export default service
