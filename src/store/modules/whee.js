const state = {
	whee: Object.keys([...Array(10)]).map(i => ({
		id: i,
		title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
		show: false,
		price: 2990,
		checked: false
	}))
}

const getters = {
	checked: state => {
		return (state.whee || []).every(k => k.checked) || false
	},
	amount: state => {
		return state.whee.filter(k => k.checked).reduce((prev, curr) => prev + curr.price, 0)
	},
	total: state => {
		return state.whee.filter(k => k.checked).length
	}
}

const mutations = {
	setWhee: (state, props) => {},
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
		if (key === 'delete') {
			state.whee.splice(index, 1)
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

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
