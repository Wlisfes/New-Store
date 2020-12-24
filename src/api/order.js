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
		method: 'GET'
	})
}
