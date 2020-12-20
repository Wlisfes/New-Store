import store from '@/store'

// const BaseUrl = 'http://172.20.10.3:3004'
const BaseUrl = 'https://app.lisfes.cn'
export default function request({ baseUrl = BaseUrl, url = '', data = {}, header = {}, method = 'GET' } = {}) {
	return new Promise((resolve, reject) => {
		const { token } = store.state.user
		uni.request({
			url: `${baseUrl}${url}`,
			data,
			header: {
				'app-token': token,
				'content-type': 'application/x-www-form-urlencoded',
				...header
			},
			method,
			success(response) {
				resolve(response.data)
			},
			fail(error) {
				reject(error)
			}
		})
	})
}
