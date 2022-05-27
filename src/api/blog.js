import request from '@/utils/request'
import { getToken} from '@/utils/auth'
export function blogList(page=1,limit=10){//分页获取文章
    return request({
        url:'/api/blog',
        method:'get',
        params:{
            page:page,
            limit:limit
        }
    })
}
export function addblog(data){//新增文章
    return request({
        url:"/api/blog",
        method:'post',
        headers:{'Authorization':'Bearer '+getToken()},
        data
    })
}
export function deleteblog(id){//删除
    return request({
        url:`/api/blog/${id}`,
        method:'delete',
        headers:{'Authorization':'Bearer '+getToken()},
    })
}
export function putblog(id,data){//修改文章
    return request({
        url:`/api/blog/${id}`,
        method:'put',
        headers:{'Authorization':'Bearer '+getToken()},
        data
    })
}
export function getblog(id){//获取单篇文章
    return request({
        url:`/api/blog/${id}`,
        method:'get'
    })
}
export function blogtype(){//获取文章分类
    return request({
        url:"/api/blogtype",
        method:'get',
    })
}

export function getoneblogtype(id){//获取一个分类
    return request({
        url:`/api/blogtype/${id}`,
        method:'get',
        headers:{'Authorization':'Bearer '+getToken()},
    })
}

export function addblogtype(data){//添加分类
    return request({
        url:`/api/blogtype`,
        method:'post',
        headers:{'Authorization':'Bearer '+getToken()},
        data
    })
}
export function deleteblogtype(id){//删除分类
    return request({
        url:`/api/blogtype/${id}`,
        method:'delete',
        headers:{'Authorization':'Bearer '+getToken()},
    })
}

export function putblogtype(id,data){//添加分类
    return request({
        url:`/api/blogtype/${id}`,
        method:'put',
        headers:{'Authorization':'Bearer '+getToken()},
        data
    })
}