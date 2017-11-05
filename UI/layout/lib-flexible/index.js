(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // 调整body的fontsize
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // 设置 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // 页面大小改变时重置rem
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    // 表示页面是否存储在缓存中，ff op的特性
    // pageshow事件触发，如果在内存中，页面显示是从内存加载的，重新显示
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 检测 0.5px 支持
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    // 检测包含border在内的高度是否为1（0.5+0.5）
    if (testElement.offsetHeight === 1) {
      // 元素的属性列表，为document的class添加hairlines
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
