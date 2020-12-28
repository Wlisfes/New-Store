import request from '@/utils/request'

//添加收藏
export function createStar(params) {
	return request({
		url: `/v1​/star​/create`,
		data: params,
		method: 'POST'
	})
}

//取消收藏
export function delStar(params) {
	return request({
		url: `/v1​/star​/del`,
		data: params,
		method: 'DELETE'
	})
}

//我的收藏列表
export function userStar(params) {
	return request({
		url: `/v1​/star​/list`,
		data: params,
		method: 'GET'
	})
}
