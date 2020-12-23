import request from '@/utils/request'

//创建订单
export function createOrder(params) {
	return request({
		url: `/v1/order/create`,
		data: params,
		method: 'POST'
	})
}
