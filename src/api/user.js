import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/cjbroadcast_public/login_v1',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/cjbroadcast_public/get_account_info_v1',
    method: 'post',
    data: {
      code: '3020'
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
