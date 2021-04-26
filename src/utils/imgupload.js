/**
 * 图片压缩工具类
 * 最大高度和最大宽度都为 500，如果超出大小将等比例缩放。
 *
 * 注意可能出现压缩后比原图更大的情况，在调用的地方自己判断大小并决定上传压缩前或压缩后的图到服务器。
 */

// 将base64转换为blob
export function convertBase64UrlToBlob(urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 压缩图片
export function compressImage(path) {
  //最大高度
  const maxHeight = 500
  //最大宽度
  const maxWidth = 500

  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = path
    img.onload = function() {
      const originHeight = img.height
      const originWidth = img.width
      let compressedWidth = img.height
      let compressedHeight = img.width
      if (originWidth > maxWidth && originHeight > maxHeight) {
        // 更宽更高，
        if (originHeight / originWidth > maxHeight / maxWidth) {
          // 更加严重的高窄型，确定最大高，压缩宽度
          compressedHeight = maxHeight
          compressedWidth = maxHeight * (originWidth / originHeight)
        } else {
          //更加严重的矮宽型, 确定最大宽，压缩高度
          compressedWidth = maxWidth
          compressedHeight = maxWidth * (originHeight / originWidth)
        }
      } else if (originWidth > maxWidth && originHeight <= maxHeight) {
        // 更宽，但比较矮，以maxWidth作为基准
        compressedWidth = maxWidth
        compressedHeight = maxWidth * (originHeight / originWidth)
      } else if (originWidth <= maxWidth && originHeight > maxHeight) {
        // 比较窄，但很高，取maxHight为基准
        compressedHeight = maxHeight
        compressedWidth = maxHeight * (originWidth / originHeight)
      } else {
        // 符合宽高限制，不做压缩
      }
      // 生成canvas
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      canvas.height = compressedHeight
      canvas.width = compressedWidth
      context.clearRect(0, 0, compressedWidth, compressedHeight)
      context.drawImage(img, 0, 0, compressedWidth, compressedHeight)
      let base64 = canvas.toDataURL('image/*', 0.8)
      // let blob = convertBase64UrlToBlob(base64)
      // 回调函数返回blob的值。也可根据自己的需求返回base64的值
      resolve(base64)
    }
  })
}

export const toBase64 = path => {
  //图片转换base64  , 异步处理
  function getBase64Image(img) {
    //转码格式方法
    var canvas = document.createElement('canvas') // 创建一个canvas
    canvas.width = img.width // 设置对应的宽高
    canvas.height = img.height
    var ctx = canvas.getContext('2d') // 二维绘图环境
    ctx.drawImage(img, 0, 0, img.width, img.height) // 将图片画在画布上
    var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase() // 获取到图片的格式
    var dataURL = canvas.toDataURL('image/' + ext) // 得到base64 编码的 dataURL
    return dataURL
  }
  return new Promise(function(resolve, reject) {
    //使用Promise进行异步处理
    let image = new Image()
    //解决图片跨域问题
    image.crossOrigin = ''
    //获取传入的图片路径
    image.src = path
    //图片加载完后的回调函数,调用转码函数
    image.onload = function() {
      resolve(getBase64Image(image)) //回调函数返回base64值
    }
  })
}
