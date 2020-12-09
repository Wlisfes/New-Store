<template>
	<view class="app-container" @touchmove.stop>
		<u-tabs-swiper
			ref="uTabs"
			active-color="#ffb41f"
			inactive-color="#141f33"
			:height="80"
			:bar-width="64"
			:is-scroll="false"
			:list="tabs.list"
			:current="tabs.current"
			@change="tabs.onChange"
			@touchmove.stop
		></u-tabs-swiper>
		<view class="container">
			<swiper
				class="app-swiper"
				:current="swiper.current"
				@transition="swiper.onTransition"
				@animationfinish="swiper.onAnimationFinish"
			>
				<swiper-item class="app-swiper-item">
					<AppOrder :custom-style="swiper.customStyle"></AppOrder>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppOrder :custom-style="swiper.customStyle"></AppOrder>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppOrder :custom-style="swiper.customStyle"></AppOrder>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppOrder :custom-style="swiper.customStyle"></AppOrder>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppOrder :custom-style="swiper.customStyle"></AppOrder>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import AppOrder from '@/components/common/order'
export default {
	name: 'Order',
	components: {
		AppOrder
	},
	data() {
		return {
			tabs: {
				list: [
					{ name: '全部' },
					{ name: '待付款' },
					{ name: '待发货' },
					{ name: '待收货' },
					{ name: '已完成' }
				],
				current: 0,
				onChange: index => {
					this.swiper.current = index
				}
			},
			swiper: {
				current: 0,
				customStyle: {
					height: '100%',
					overflow: 'hidden'
				},
				onTransition: e => {
					this.$refs.uTabs.setDx(e.detail.dx)
				},
				onAnimationFinish: e => {
					const current = e.detail.current
					this.$refs.uTabs.setFinishCurrent(current)
					this.swiper.current = current
					this.tabs.current = current
				}
			}
		}
	},
	onLoad(options) {
		this.tabs.current = parseInt(options.current || 0)
		this.swiper.current = parseInt(options.current || 0)
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	height: 100vh;
	background-color: #f5f7fa;
	overflow: hidden;
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
}
.app-swiper {
	height: 100%;
	&-item {
		height: 100%;
		overflow: hidden;
		position: relative;
	}
}
</style>
