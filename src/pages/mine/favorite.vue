<template>
	<view class="app-container" @touchmove.stop>
		<AppScroll
			class="scroll"
			:customStyle="scroll.customStyle"
			:scroll-y="scroll.scrollY"
			:refresher-enabled="scroll.refresherEnabled"
			:lower-threshold="500"
			:freshing="scroll.freshing"
			:triggered="scroll.triggered"
			@refresh="scroll.onRefresh"
			@restore="scroll.onRestore"
		>
			<view class="list">
				<view class="list-item" v-for="(item, index) in scroll.dataSource" :key="index">
					<view class="back-image">
						<u-image width="200rpx" height="200rpx" src="/static/icons/1605967031503.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<view class="list-content">
						<view class="title u-line-2">{{ item.title }}</view>
						<view class="format">
							<text class="u-line-1">规格：</text>
						</view>
						<view class="coin">
							<view class="coin-num u-line-1">¥29.9</view>
						</view>
					</view>
				</view>
			</view>
		</AppScroll>
	</view>
</template>

<script>
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Favorite',
	components: {
		AppScroll
	},
	data() {
		return {
			scroll: {
				dataSource: Object.keys([...Array(10)]).map(i => ({
					id: i,
					title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
					show: false,
					checked: false
				})),
				customStyle: { height: '100%' },
				scrollY: true,
				refresherEnabled: true,
				freshing: false,
				triggered: false,
				onRefresh: () => {
					console.log('刷新')
					this.scroll.freshing = true
					this.scroll.triggered = true
					setTimeout(() => {
						this.scroll.triggered = false
						this.scroll.freshing = false
					}, 500)
				},
				onRestore: () => {
					console.log('刷新结束')
					this.scroll.triggered = 'restore'
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	height: 100vh;
	overflow: hidden;
	background-color: #f5f7fa;
	.scroll {
		flex: 1;
		overflow: hidden;
		.app-loading {
			background-color: #f5f7fa;
			text-align: center;
			padding: 32rpx;
		}
	}
}
.list {
	padding: 0 30rpx;
	overflow: hidden;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	&-item {
		display: flex;
		border-radius: 12rpx;
		overflow: hidden;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #ffffff;
		&:last-child {
			margin-bottom: 30rpx;
		}
		.back-image {
			border-radius: 8rpx;
			overflow: hidden;
			background-color: #f5f7fa;
		}
	}
	&-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		.title {
			height: 80rpx;
			line-height: 40rpx;
			overflow: hidden;
		}
		.format {
			flex: 1;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #99a0ad;
		}
		.coin {
			display: flex;
			align-items: center;
			&-num {
				flex: 1;
				font-size: 26rpx;
				color: #fa3534;
			}
		}
	}
}
</style>
