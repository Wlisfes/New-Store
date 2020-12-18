import request from '@/utils/request'

//source分类
export function source(params) {
	return request({
		url: `/v1/source/list`,
		data: params,
		method: 'GET'
	})
}

//猜你喜欢
export function productLove(params) {
	return request({
		url: `/v1/product/love`,
		data: params,
		method: 'GET'
	})
}

//商品详情
export function productInfo(params) {
	return request({
		url: `/v1/product/info`,
		data: params,
		method: 'GET'
	})
}
