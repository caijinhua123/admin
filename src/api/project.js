import request from '@/utils/request'
import { getToken} from '@/utils/auth'

export function getproject(){//获取所有项目
    return request({
        url: '/api/project',
        method: 'get',
      })
}

export function putproject(id,data){//修改项目
    let newdata ={...data}
    newdata = {
        "description": newdata.description, // 项目描述段落
        "name": newdata.name, // 项目名称
        "url": newdata.url, // 项目效果请求地址
        "github":newdata.github, // 项目github地址
        "thumb": newdata.thumb, // 缩略图，项目截图
        "order":  newdata.order // 排序
    }
    console.log(newdata,'id');
    // newdata.description = newdata.description.split(',')
    return request({
        url: `/api/project/${id}`,
        method: 'put',
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        newdata
    })
}


export function addproject(data){//新增项目
    return request({
        url: '/api/project',
        method: 'post',
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        data
      })
}

export function deleteproject(id){//根据id删除项目
    return request({
        url: `/api/project/${id}`,
        method: 'delete',
        headers:{
            'Authorization':'Bearer '+getToken()
        },
      })
}