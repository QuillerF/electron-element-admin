import request from '@/utils/request'

// export function getToken() {
//   return request({
//     url: '/qiniu/upload/token', // 假地址 自行替换
//     method: 'get'
//   })
// }

/**
 * 上传文件
 * @param {*} file
 */
const uploadPicToQiniu = async file => {
  const formData = new FormData()
  // 文件对象
  formData.append('file', file)

  request({
    url: '/upload/file',
    method: 'post',
    data: formData
  })
}

export default {
  uploadPicToQiniu
}
