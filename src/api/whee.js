import request from '@/utils/request'

//购物车列表
export function whee(params) {
	return request({
		url: `/v1/whee/list`,
		data: params,
		method: 'GET'
	})
}

//批量获取购物车
export function wheeAnd(params) {
	return request({
		url: `/v1/whee/ids`,
		data: params,
		method: 'POST'
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

//添加订单商品到购物车
export function createOrderWhee(params) {
	return request({
		url: `/v1/whee/create/order`,
		data: params,
		method: 'POST'
	})
}

//加入购物车缓存
export function createCacheWhee(params) {
	return request({
		url: `/v1/whee/create/cache`,
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
