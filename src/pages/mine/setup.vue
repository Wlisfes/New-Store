<template>
	<view>
		设置
	</view>
</template>

<script>
export default {
	name: 'Setup',
	data() {
		return {}
	},
	created() {
		console.log('created:', this.$mp.page.options)
	},
	onLoad(e) {
		console.log('onLoad:', e)
	},
	methods: {}
}
</script>
