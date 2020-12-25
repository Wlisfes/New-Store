import store from '@/store'

export default function() {
	uni.getStorage({
		key: 'uid',
		success: async response => {
			const { code } = await store.dispatch('user/AuthOne', { uid: response.data })
			if (code === 200) {
				await store.dispatch('user/AuthCount')
			}
		}
	})
}
