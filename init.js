window.addEventListener('load', () => {
  window.parent.postMessage(
    {
      height: document.documentElement.scrollHeight,
    },
    '*',
  )
})
