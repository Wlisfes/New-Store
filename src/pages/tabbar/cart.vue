<template>
	<view class="app-container">
		<AppWhee class="whee"></AppWhee>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import AppWhee from '@/components/common/whee'
export default {
	name: 'Cart',
	components: {
		AppWhee
	},
	data() {
		return {}
	},
	computed: {
		...mapState({
			user: state => state.user,
			uid: state => state.user.uid
		})
	},
	watch: {
		uid: {
			handler() {
				console.log(this.user)
			},
			immediate: true
		}
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.app-container {
	height: 100vh;
	.whee {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		/deep/ .app-whee {
			flex: 1;
		}
	}
}
</style>
