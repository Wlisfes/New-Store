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
					<view class="book">
						<view class="book-amount">¥5</view>
						<view class="book-desc">满20可用</view>
					</view>
					<view class="content">
						<view class="name u-line-1">水果专享卷</view>
						<view class="desc u-line-2">
							<text>仅用于指定商家仅用于指定商家仅</text>
						</view>
						<view class="u-line-1">2020-10-21~2020-12-31</view>
					</view>
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

<style lang="scss">
.app-coupon {
	padding: 0 30rpx;
	overflow: hidden;
	background-color: #f5f7fa;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	&-item {
		height: 180rpx;
		display: flex;
		margin-top: 30rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
		&:last-child {
			margin-bottom: 30rpx;
		}
		.line {
			width: 10rpx;
			height: 100%;
		}
		.book {
			width: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			&-amount {
				color: #fa3534;
				font-size: 48rpx;
			}
			&-desc {
				color: #141f33;
				font-size: 26rpx;
			}
		}
		.status {
			width: 112rpx;
			padding-top: 12rpx;
		}
		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-right: 12rpx;
			font-size: 24rpx;
			color: #99a0ad;
			.name {
				font-size: 32rpx;
				color: #141f33;
				font-weight: 500;
			}
			.desc {
				height: 64rpx;
				line-height: 32rpx;
				margin: 4rpx 0;
			}
		}
	}
}
</style>
