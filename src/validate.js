export function isvalidPass (str) {
  const reg = /^[a-zA-Z]\w{8,18}$/
  return reg.test(str)
}
export function isvaildPhone (str) {
  const reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
  return reg.test(str)
}
export function isvalidEmail (str) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return reg.test(str)
}
