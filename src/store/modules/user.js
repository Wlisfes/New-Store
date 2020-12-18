import { register, findOne } from '@/api/user'

const state = {
	uid: 0,
	openid: '',
	mobile: '',
	avatar: '',
	nickname: '',
	token: ''
}

const mutations = {
	setUser: (state, user) => {
		state.avatar = user.avatar
		state.nickname = user.nickname
		state.mobile = user.mobile
		state.openid = user.openid
		state.token = user.token
		state.uid = user.uid
		uni.setStorage({ key: 'uid', data: user.uid })
	}
}

const actions = {
	//拉取用户信息
	findOne: async ({ commit }, props) => {
		const response = await findOne(props)
		const { code, data } = response
		if (code === 200) {
			commit('setUser', data)
		}
		return response
	},
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
