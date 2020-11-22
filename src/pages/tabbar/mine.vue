<template>
	<view>
		我的
		<u-button type="warning" @click="onClick(111)">警告按钮</u-button>
	</view>
</template>

<script>
export default {
	name: 'Mine',
	data() {
		return {}
	},
	onLoad() {},
	methods: {
		onClick(number) {
			console.log(number)
			uni.navigateTo({
				url: `/pages/mine/setup?id=${new Date().getTime()}`,
				fail(e) {
					console.log(e)
				}
			})
		}
	}
}
</script>

<style></style>
