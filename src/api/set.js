import request from '@/utils/request'
import { getToken} from '@/utils/auth'
export function getset() {
    return request({
        url:"/api/setting",
        method:"get",
    });
}
export function set(data) {
    return request({
        url:"/api/setting",
        method:"put",
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        data
    });
}