// 代码生成时间: 2025-10-04 00:00:21
const fs = require('fs')
const path = require('path')
const { defu } = require('@nuxt/utils')

// 证书管理系统配置
const config = defu(process.env, {
  CREDENTIALS_DIR: './credentials',
  CREDENTIALS_FILE: 'credentials.json',
  CREDENTIALS_EXPIRATION_DAYS: 365,
})

// 证书文件存储路径
const credentialsPath = path.join(config.CREDENTIALS_DIR, config.CREDENTIALS_FILE)

// 证书存储结构
let credentials = {}

// 初始化证书存储
function initializeCredentials() {
  if (fs.existsSync(credentialsPath)) {
    const data = fs.readFileSync(credentialsPath, 'utf8')
    credentials = JSON.parse(data)
  } else {
    credentials = {}
  }
}

// 添加证书
function addCertificate(id, certificate) {
  try {
    if (certificate.exp < Date.now()) {
      throw new Error('Certificate has expired.')
    }
    credentials[id] = certificate
    fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Failed to add certificate:', error)
    return false
  }
}

// 删除证书
function deleteCertificate(id) {
  try {
    if (!credentials[id]) {
      throw new Error('Certificate not found.')
    }
    delete credentials[id]
    fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Failed to delete certificate:', error)
    return false
  }
}

// 获取证书
function getCertificate(id) {
  if (credentials[id]) {
    return credentials[id]
  }
  return null
}

// 更新证书
function updateCertificate(id, newCertificate) {
  try {
    if (!credentials[id]) {
      throw new Error('Certificate not found.')
    }
    if (newCertificate.exp < Date.now()) {
      throw new Error('New certificate has expired.')
    }
    credentials[id] = newCertificate
    fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Failed to update certificate:', error)
    return false
  }
}

// 检查证书是否过期
function isCertificateExpired(certificate) {
  return (certificate.exp && certificate.exp < Date.now())
}

// 导出模块
module.exports = {
  initializeCredentials,
  addCertificate,
  deleteCertificate,
  getCertificate,
  updateCertificate,
  isCertificateExpired,
}
