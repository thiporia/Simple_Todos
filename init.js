window.onload= function() {
  console.log('onload', document.documentElement.scrollHeight)
  window.parent.postMessage(
    {
      height: document.documentElement.scrollHeight,
    },
    '*',
  )
})
