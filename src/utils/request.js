const BaseUrl = 'http://127.0.0.1:3004'

export default function request({ baseUrl = BaseUrl, url = '', data = {}, header = {}, method = 'GET' } = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${url}`,
			data,
			header: { ...header },
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
