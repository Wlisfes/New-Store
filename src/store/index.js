import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import whee from '@/store/modules/whee'
import common from '@/store/modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		user,
		whee,
		common
	}
})

export default store
