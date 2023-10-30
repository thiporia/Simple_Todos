window.onload(() => {
  window.parent.postMessage(
    {
      height: document.documentElement.scrollHeight,
    },
    '*',
  )
})
