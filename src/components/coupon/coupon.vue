<template>
	<view :style="[customStyle]">
		<AppScroll
			class="scroll"
			:customStyle="customStyle"
			:scroll-y="scroll.scrollY"
			:refresher-enabled="scroll.refresherEnabled"
			:freshing="scroll.freshing"
			:triggered="scroll.triggered"
			@refresh="scroll.onRefresh"
			@restore="scroll.onRestore"
		>
			<view class="app-coupon">
				<view class="app-coupon-item" v-for="(props, index) in dataSource" :key="index">
					<view class="line" :style="{ backgroundColor: lineColor }"></view>
					<view class="book"></view>
					<view class="content"></view>
					<view class="status">
						<u-icon v-if="status === 1" name="/static/icons/1606660143377.png" size="100"></u-icon>
						<u-icon v-if="status === 2" name="/static/icons/1606660154639.png" size="100"></u-icon>
					</view>
				</view>
			</view>
		</AppScroll>
	</view>
</template>

<script>
import AppScroll from '@/components/common/scroll'
export default {
	name: 'AppCoupon',
	components: { AppScroll },
	props: {
		customStyle: {
			type: Object,
			default: () => {}
		},
		lineColor: {
			type: String,
			default: '#FF5A47'
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		status: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			scroll: {
				scrollY: true,
				refresherEnabled: true,
				freshing: false,
				triggered: 'restore',
				onRefresh: () => {
					console.log('刷新')
					this.scroll.freshing = true
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

<style lang="scss">
.app-coupon {
	padding: 0 30rpx 30rpx;
	overflow: hidden;
	background-color: #f5f7fa;
	&-item {
		height: 180rpx;
		display: flex;
		margin-top: 30rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		.line {
			width: 10rpx;
			height: 100%;
		}
		.book {
			width: 180rpx;
		}
		.status {
			width: 120rpx;
			padding-top: 20rpx;
		}
		.content {
			flex: 1;
		}
	}
}
</style>
