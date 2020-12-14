import { register } from '@/api/user'

const state = {
	uid: 0,
	openid: '',
	mobile: '',
	avatar: '',
	nickname: ''
}

const mutations = {
	setUser: (state, user) => {
		state.uid = user.uid
		state.avatar = user.avatar
		state.nickname = user.nickname
		state.mobile = user.mobile
		state.openid = user.openid
	}
}

const actions = {
	//授权用户信息
	AuthUser({ commit }, props) {
		return new Promise((resolve, reject) => {
			uni.showLoading({ title: '加载中...' })
			uni.login({
				provider: 'weixin',
				success: async ({ code }) => {
					const response = await register({ ...props, code })
					const { data, message } = response
					if (response.code === 200) {
						uni.hideLoading()
						commit('setUser', data)
						resolve(response)
					} else {
						uni.showToast({ title: message })
					}
				}
			})
		})
	},
	//授权用户手机号
	async AuthMobile({ commit }) {}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
