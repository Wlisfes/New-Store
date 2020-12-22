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

//删除物车
export function deleteWhee(params) {
	return request({
		url: `/v1/whee/del`,
		data: params,
		method: 'DELETE'
	})
}

//添加收藏
export function createStar(params) {
	return request({
		url: `/v1/star/create`,
		data: params,
		method: 'POST'
	})
}

//取消收藏
export function deleteStar(params) {
	return request({
		url: `/v1/star/del`,
		data: params,
		method: 'DELETE'
	})
}