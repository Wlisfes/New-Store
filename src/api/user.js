import request from '@/utils/request'

//注册用户
export function register(params) {
	return request({
		url: `/v1/user/create`,
		data: params,
		method: 'POST'
	})
}
