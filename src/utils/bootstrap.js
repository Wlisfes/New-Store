import store from '@/store'

export default async function() {
	uni.getStorage({
		key: 'uid',
		success: async response => {
			await store.dispatch('user/findOne', { uid: response.data })
		}
	})
}
