const state = {
	openid: '',
	mobile: '',
	avatar: '',
	nickname: ''
}

const mutations = {
	setUser: (state, user) => {
		console.log(user)
	}
}

const actions = {
	//授权用户信息
	async AuthUser({ commit }, props) {
		console.log(props)
	},
	//授权用户手机号
	async authMobile({ commit }) {}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
