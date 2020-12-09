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
					<AppCoupon :custom-style="swiper.customStyle" :dataSource="dataSource"></AppCoupon>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppCoupon
						:custom-style="swiper.customStyle"
						:dataSource="[1, 2, 3, 4, 5]"
						:status="1"
						lineColor="#C9CED6"
					></AppCoupon>
				</swiper-item>
				<swiper-item class="app-swiper-item">
					<AppCoupon
						:custom-style="swiper.customStyle"
						:dataSource="[1, 2, 3, 4]"
						:status="2"
						lineColor="#C9CED6"
					></AppCoupon>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import AppCoupon from '@/components/common/coupon'
export default {
	name: 'Coupon',
	components: {
		AppCoupon
	},
	data() {
		return {
			tabs: {
				list: [{ name: '可使用' }, { name: '已使用' }, { name: '已过期' }],
				current: 0,
				onChange: index => {
					console.log(index)
					this.swiper.current = index
				}
			},
			swiper: {
				current: 0,
				customStyle: { height: '100%' },
				onTransition: e => {
					this.$refs.uTabs.setDx(e.detail.dx)
				},
				onAnimationFinish: e => {
					const current = e.detail.current
					this.$refs.uTabs.setFinishCurrent(current)
					this.swiper.current = current
					this.tabs.current = current
				}
			},
			dataSource: Object.keys([...Array(20)])
		}
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
