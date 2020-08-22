const responseText = (val) => {
  return val
}
const debounce = (fn, delay) => {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
export {
  responseText,
  debounce
}
