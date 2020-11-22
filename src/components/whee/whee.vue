<template>
	<view class="app-whee">
		<view class="header" @touchmove.stop></view>
		<scroll-view
			class="scroll"
			scroll-y
			refresher-enabled
			:lower-threshold="500"
			:refresher-triggered="triggered"
			@refresherrefresh="onRefresh"
			@refresherrestore="onRestore"
		>
			<view class="container">
				<u-image
					width="300"
					v-for="(k, index) in list"
					:key="index"
					src="/static/icons/1605967031503.png"
					mode="widthFix"
				></u-image>
			</view>
		</scroll-view>
		<view class="footer" @touchmove.stop></view>
	</view>
</template>

<script>
export default {
	name: 'Whee',
	data() {
		return {
			list: Object.keys([...Array(30)]),
			triggered: 'restore'
		}
	},
	onLoad() {
		this._freshing = false
	},
	methods: {
		onRestore() {
			this.triggered = 'restore'
			console.log('需要重置')
		},
		onRefresh() {
			if (this._freshing) return
			this._freshing = true
			console.log('下拉刷新触发')
			setTimeout(() => {
				this.triggered = false
				this._freshing = false
				console.log('下拉刷新结束')
			}, 1500)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-whee {
	display: flex;
	flex-direction: column;
	.header,
	.footer {
		height: 100rpx;
	}
	.scroll {
		flex: 1;
		overflow: hidden;
		background-color: #f5f7fa;
	}
}
.container {
	margin: 0 30rpx;
}
</style>
