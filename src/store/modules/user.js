const state = {
	openid: '',
	mobile: '',
	avatar: '',
	nickname: ''
}

const mutations = {
	setUser: (state, user) => {
		state.avatar = user.avatarUrl
		state.nickname = user.nickName
	}
}

const actions = {
	//授权用户信息
	AuthUser({ commit }, props) {
		return new Promise((resolve, reject) => {
			commit('setUser', props)
			resolve(props)
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
