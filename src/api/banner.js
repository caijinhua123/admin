import request from '@/utils/request'

export function getbanner(){
    return request({
        url: '/api/banner',
        method: 'get',
      })
}

export function postbanner(data){
    return request({
        url: '/api/banner',
        method: 'post',
        data,
        headers:{Authorization:'Bearer '+window.localStorage.getItem('token')}
      })
}

