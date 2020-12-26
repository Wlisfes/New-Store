import request from '@/utils/request'

//注册用户
export function register(params) {
	return request({
		url: `/v1/user/create`,
		data: params,
		method: 'POST'
	})
}

//拉取用户信息
export function AuthOne(params) {
	if (params.uid) {
		return request({
			url: `/v1/user/one/uid`,
			data: params,
			method: 'GET'
		})
	} else if (params.openid) {
		return request({
			url: `/v1/user/one/openid`,
			data: params,
			method: 'GET'
		})
	}
}

//统计信息
export function AuthCount(params) {
	return request({
		url: `/v1/user/count`,
		data: params,
		method: 'GET'
	})
}
