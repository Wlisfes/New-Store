import request from '@/utils/request'

export const banner = params => {
	return request({
		url: `https://play.lisfes.cn/api/banner`,
		data: params,
		method: 'GET'
	})
}
