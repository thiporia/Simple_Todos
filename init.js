;(function () {
  window.addEventListener('load', function () {
    console.log('onload', document.documentElement.scrollHeight)
    window.parent.postMessage(
      {
        height: document.documentElement.scrollHeight,
      },
      '*',
    )
  })
})()
