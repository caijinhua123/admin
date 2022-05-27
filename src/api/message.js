import request from '@/utils/request'
import { getToken} from '@/utils/auth'
export function getMessages(page = 1, limit = 10) {
    return request({
        url:"/api/message",
        method:"get",
        params: {
            page,
            limit,
        },
    });
}

export function delMessage(id) {
    return request({
        url:`/api/message/${id}`,
        method:'delete',
        headers:{"Authorization":"Bearer "+getToken()},
    });
}