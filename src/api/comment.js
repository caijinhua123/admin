import request from '@/utils/request'
import { getToken} from '@/utils/auth'

export function getcomment(page=1,limit=10){//获取所有项目
    return request({
        url: '/api/comment',
        method: 'get',
        params:{
            page,
            limit
        }
      })
}

export function deletecomment(id){//获取所有项目
    return request({
        url:`/api/comment/${id}`,
        method: 'delete',
      })
}