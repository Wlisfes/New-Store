import request from '@/utils/request'

//我的优惠劵
export function userCoupon(params) {
	return request({
		url: `/v1/coupon/user`,
		data: params,
		method: 'GET'
	})
}
