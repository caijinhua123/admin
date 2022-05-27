import request from '@/utils/request'
import { getToken} from '@/utils/auth'
export function getabout() {
    return request({
        url:"/api/about",
        method:"get",
    });
}
export function setabout(data) {
    return request({
        url:"/api/about",
        method:"post",
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        data
    });
}