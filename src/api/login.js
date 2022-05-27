import request from '@/utils/request'

export function getcaptcha(){
    return request({
        url: '/res/captcha',
        method: 'get',
      })
}
export function login(data){
  return request({
      url: '/api/admin/login',
      method: 'post',
      data
    })
}

export function whoami(){
  return request({
    url:'/api/admin/whoami',
    method: 'get'
  })
}