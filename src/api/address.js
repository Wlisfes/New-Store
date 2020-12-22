import request from '@/utils/request'

//获取默认地址
export function address(params) {
	return request({
		url: `/v1/address`,
		data: params,
		method: 'GET'
	})
}
