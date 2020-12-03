<template>
	<view class="app-container" @touchmove.stop>
		<AppScroll
			class="scroll"
			:customStyle="scroll.customStyle"
			:scroll-y="scroll.scrollY"
			:refresher-enabled="scroll.refresherEnabled"
			:freshing="scroll.freshing"
			:triggered="scroll.triggered"
			@refresh="scroll.onRefresh"
			@restore="scroll.onRestore"
		>
			<view class="banner">
				<swiper class="banner-swiper" indicator-dots autoplay>
					<swiper-item v-for="(k, index) in 8" :key="index">
						<u-image width="100%" height="100%" src="/static/icons/1605967031503.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</swiper-item>
				</swiper>
				<view class="banner-footer">
					<view class="context">
						<view class="context-title u-line-1">应季鲜橙 3kg装 单果约200g</view>
						<view class="context-sub">
							<text class="amount">¥19.9</text>
							<text class="amount-inverse">¥29.9</text>
							<text class="month-sales">月销:3450</text>
						</view>
					</view>
					<view class="star">
						<u-icon name="heart" size="44" color="#99a0ad"></u-icon>
						<text>收藏</text>
					</view>
				</view>
			</view>
			<u-gap height="30" bg-color="#f5f7fa"></u-gap>
		</AppScroll>
		<AppFooter></AppFooter>
	</view>
</template>

<script>
import AppScroll from '@/components/common/scroll'
import AppFooter from '@/components/common/footer'
export default {
	name: 'Product',
	components: {
		AppScroll,
		AppFooter
	},
	data() {
		return {
			scroll: {
				dataSource: Object.keys([...Array(20)]),
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
						this.scroll.dataSource = Object.keys([...Array(20)])
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
	.scroll {
		flex: 1;
		overflow: hidden;
	}
}
.banner {
	background-color: #ffffff;
	&-swiper {
		height: 750rpx;
	}
	&-footer {
		height: 140rpx;
		padding: 0 30rpx;
		display: flex;
		.star {
			width: 140rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #99a0ad;
		}
	}
	.context {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		&-title {
			font-size: 36rpx;
			color: #141f33;
			font-weight: 500;
		}
		&-sub {
			display: flex;
			align-items: baseline;
		}
		.amount {
			font-size: 36rpx;
			color: #fa3534;
			font-weight: 500;
		}
		.amount-inverse {
			font-size: 28rpx;
			color: #99a0ad;
			text-decoration: line-through;
			margin-left: 4rpx;
		}
		.month-sales {
			font-size: 28rpx;
			color: #99a0ad;
			margin-left: 40rpx;
		}
	}
}
</style>
