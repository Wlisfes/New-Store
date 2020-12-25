import { register, AuthOne, AuthCount } from '@/api/user'

const state = {
	uid: 0,
	openid: '',
	mobile: '',
	avatar: '',
	nickname: '',
	token: '',
	balance: 0,
	conter: 0,
	coupon: 0,
	haven: 0,
	income: 0,
	issue: 0,
	star: 0
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
	},
	setCount: (state, props) => {
		state.balance = props.balance
		state.conter = props.conter
		state.coupon = props.coupon
		state.haven = props.haven
		state.income = props.income
		state.issue = props.issue
		state.star = props.star
	}
}

const actions = {
	//拉取用户信息
	AuthOne: async ({ commit }, props) => {
		const response = await AuthOne(props)
		const { code, data } = response
		if (code === 200) {
			commit('setUser', data)
		}
		return response
	},
	//统计信息
	AuthCount: async ({ commit }) => {
		const response = await AuthCount()
		const { code, data } = response
		if (code === 200) {
			commit('setCount', data)
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
						uni.showToast({
							title: message,
							icon: 'none'
						})
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
