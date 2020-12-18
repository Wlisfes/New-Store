import request from '@/utils/request'

//购物车列表
export function whee(params) {
	return request({
		url: `/v1/whee/list`,
		data: params,
		method: 'GET'
	})
}

//加入购物车
export function createWhee(params) {
	return request({
		url: `/v1/whee/create`,
		data: params,
		method: 'POST'
	})
}
