import request from '@/utils/request'

//创建订单
export function createOrder(params) {
	return request({
		url: `/v1/order/create`,
		data: params,
		method: 'POST'
	})
}

//支付订单
export function payOrder(params) {
	return request({
		url: `/v1/order/pay`,
		data: params,
		method: 'PUT'
	})
}

//订单列表
export function orderList(params) {
	return request({
		url: `/v1/order/list`,
		data: params,
		method: 'GET'
	})
}

//删除订单
export function delOrder(params) {
	return request({
		url: `/v1/order/del`,
		data: params,
		method: 'DELETE'
	})
}

//确认收货
export function incomeOrder(params) {
	return request({
		url: `/v1/order/income`,
		data: params,
		method: 'PUT'
	})
}
