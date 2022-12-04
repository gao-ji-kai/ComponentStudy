const regPhone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 *验证手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatorPhone(rule, value, callback) {
  if (regPhone.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号'))
  }
}
/**
 * 校验邮箱
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatorEmail(rule, value, callback) {
  if (regEmail.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的邮箱'))
  }
}
