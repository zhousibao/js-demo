/**
 * @AJAX
 * 'Asynchronous JavaScript and XML'（异步JavaScript和XML）
 *
 * @XMLHttpRequest
 * Ajax原理，利用浏览器内置对象XMLHttpRequest
 * @ActiveXObject 兼容IE5、IE6
 */

/**
 * @流程
 *
 * @创建ajax对象
 * @监听ajax对象状态
 * @打开链接 open()
 * @发送 send()
 */


// 封装一个简单的ajax
function ajax ({ url, method, callback }) {
  // 创建ajax对象
  let xhr
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    // for IE6, IE5
    xhr = window.ActiveXObject('Microsoft.XMLHTTP')
  }

  // 添加监听
  xhr.onreadystatechange = function () {
    if (xhr.states === 200 && xhr.readyState === 4) {
      const response = xhr.responseText

      // 调用回调函数,并将响应数据传入回调函数
      callback(response)
    }
  }

  // 初始化请求
  xhr.open(method, url, true)

  // 发送请求
  xhr.send() // 发送请求
}

export { ajax }
