import request from '@/utils/request'

//banner轮播图
export function banner(params) {
	return request({
		url: `/v1/banner/list`,
		data: params,
		method: 'GET'
	})
}

//source分类
export function source(params) {
	return request({
		url: `/v1/source/list`,
		data: params,
		method: 'GET'
	})
}

//热销
export function hotwell(params) {
	return request({
		url: `/v1/hotwell/list`,
		data: params,
		method: 'GET'
	})
}
