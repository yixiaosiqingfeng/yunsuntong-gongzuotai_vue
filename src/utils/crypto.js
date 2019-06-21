import CryptoJS from 'crypto-js'
// 采用ECB模式进行密码加密处理
let key = '30313233343536373839414243444546'
key = CryptoJS.enc.Hex.parse(key)

// 加密
export function encryption(pass) {
  const enc = CryptoJS.AES.encrypt(pass, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return enc.ciphertext.toString()
}

// 解密
export function decrypt(pass) {
  const dec = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(pass), key, {
    // iv:iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(dec)
}

