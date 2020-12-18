import { whee } from '@/api/whee'

const state = {
	list: []
}

const getters = {
	checked: state => {
		return (state.list || []).every(k => k.checked) || false
	},
	amount: state => {
		return state.list.filter(k => k.checked).reduce((prev, curr) => prev + curr.price, 0)
	},
	total: state => {
		return state.list.filter(k => k.checked).length
	}
}

const mutations = {
	setWhee: (state, list) => {
		state.list = list
	},
	//购物车item左滑事件
	onSwipe: (state, props) => {
		const { index } = props
		state.whee[index].show = true
		state.whee.map((val, idx) => {
			if (index != idx) {
				state.whee[idx].show = false
			}
		})
	},
	//购物车左滑选项点击事件
	onClick: (state, props) => {
		const { index, key } = props
		const { id } = state.whee[index]
		if (key === 'delete') {
			// state.whee.splice(index, 1)
			// state.whee[index].show = false
			console.log(state.whee[index])
			state.whee = state.whee.map(v => ({ ...v, show: false })).filter(k => k.id != id)
		} else {
			uni.showToast({ title: `收藏第${index + 1}个` })
		}
	},
	//购物车复选框事件
	onChange: (state, props) => {
		const { value, index, name } = props
		if (name === 'active') {
			state.whee.map((val, idx) => {
				state.whee[idx].checked = value
			})
		} else {
			state.whee[index].checked = value
		}
	}
}

const actions = {
	//购物车列表数据
	list: async ({ commit }) => {
		const response = await whee()
		if (response.code === 200) {
			commit('setWhee', response.data)
		}
		return response
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
