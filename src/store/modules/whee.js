import { whee, createStar, deleteWhee } from '@/api/whee'

const state = {
	list: []
}

const getters = {
	checked: state => {
		return (state.list || []).every(k => k.checked) || false
	},
	amount: state => {
		return state.list
			.filter(k => k.checked)
			.map(k => k.some * k.sku.price)
			.reduce((prev, curr) => prev + curr, 0)
	},
	ids: state => {
		return state.list.filter(k => k.checked).map(k => k.id)
	},
	total: state => {
		return state.list.filter(k => k.checked).length
	}
}

const mutations = {
	setWhee: (state, list) => {
		state.list = list.map(k => ({ ...k, checked: false, show: false }))
	},
	//购物车item左滑事件
	onSwipe: (state, props) => {
		const { index } = props
		state.list[index].show = true
		state.list.map((val, idx) => {
			if (index != idx) {
				state.list[idx].show = false
			}
		})
	},
	//购物车复选框事件
	onChange: (state, props) => {
		const { value, index, name } = props
		if (name === 'active') {
			state.list.map((val, idx) => {
				state.list[idx].checked = value
			})
		} else {
			state.list[index].checked = value
		}
	},
	onClose: (state, { index }) => {
		state.list[index].show = false
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
	},
	//购物车左滑选项点击事件
	onClick: async ({ commit, state }, props) => {
		const { index, key } = props
		const { id, product } = state.list[index]
		uni.showLoading({ title: '加载中' })
		if (key === 'delete') {
			//删除
			const response = await deleteWhee({ id })
			const { code, data, message } = response
			if (code === 200) {
				const res = await whee()
				if (res.code === 200) {
					commit('setWhee', res.data)
				}
				uni.showToast({ title: data })
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
		} else {
			//收藏
			const response = await createStar({ id: product.id })
			const { code, data, message } = response
			if (code === 200) {
				uni.showToast({ title: data })
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
			commit('onClose', { index })
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
