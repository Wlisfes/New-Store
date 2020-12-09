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
			<view class="app-order">
				<view class="app-order-item" v-for="(props, index) in dataSource" :key="index">
					<view class="order-title">
						<text :style="{ flex: 1, fontWeight: 500 }">订单号: {{ props.orderid }}</text>
						<text :style="{ color: '#fa3534', fontSize: '26rpx' }">待付款</text>
					</view>
					<view class="order-container" v-for="(item, idx) in props.products" :key="idx">
						<u-image
							width="200rpx"
							height="200rpx"
							src="/static/icons/1605967031503.png"
							mode="widthFix"
						></u-image>
						<view class="content">
							<view class="content-name">
								<text class="u-line-2">待付款待付款待付款待付款待付款待付款待付款待付款待付款待付</text>
							</view>
							<view class="content-format">
								<text class="u-line-1">规格：</text>
							</view>
						</view>
						<view class="order-info">
							<view>¥{{ item.price / 100 || '0.00' }}</view>
							<view class="order-info-number">{{ `x${item.number}` }}</view>
						</view>
					</view>
					<view class="order-total">
						<text>总价¥1219.50</text>
						<text>优惠¥219.50</text>
						<text>实付款</text>
						<text :style="{ fontSize: '30rpx', fontWeight: 500 }">¥1200</text>
					</view>
					<view class="order-footer">
						<view :style="{ flex: 1 }">
							<u-icon
								:custom-style="{ padding: '10rpx' }"
								name="more-dot-fill"
								color="#616b80"
								size="32"
							></u-icon>
						</view>
						<view :style="{ display: 'flex' }">
							<button class="order-button" hover-class="none">加入购物车</button>
							<button class="order-button" hover-class="none">取消订单</button>
							<button class="order-button active" hover-class="none">付款</button>
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
	name: 'AppOrder',
	components: {
		AppScroll
	},
	props: {
		customStyle: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			dataSource: [
				{
					id: 1,
					orderid: 202012091607492199555,
					status: 1,
					products: [{ number: 1, price: 59900 }]
				},
				{
					id: 2,
					orderid: 202012091607495060124,
					status: 1,
					products: [
						{ number: 1, price: 5990 },
						{ number: 1, price: 599 },
						{ number: 1, price: 599 }
					]
				},
				{
					id: 3,
					orderid: 202012091607495074298,
					status: 1,
					products: [
						{ number: 1, price: 599 },
						{ number: 1, price: 599 }
					]
				}
			],
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
	},
	created() {
		console.log(this.current, this.active)
	}
}
</script>

<style lang="scss" scoped>
.app-order {
	padding: 0 30rpx;
	overflow: hidden;
	background-color: #f5f7fa;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	&-item {
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff; //#fa3534;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
		&:last-child {
			margin-bottom: 30rpx;
		}
		.order-title {
			font-size: 28rpx;
			color: #141f33;
			display: flex;
			align-items: center;
		}
	}
	.order-container {
		display: flex;
		margin: 20rpx 0;
		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 16rpx;
			&-name {
				flex: 1;
				font-size: 30rpx;
				color: #141f33;
			}
			&-format {
				height: 80rpx;
				font-size: 26rpx;
				color: #99a0ad;
			}
		}
		.order-info {
			width: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-end;
			font-size: 28rpx;
			color: #141f33;
			&-number {
				font-size: 24rpx;
				color: #616b80;
				line-height: 1;
			}
		}
	}
	.order-total {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 24rpx;
		color: #616b80;
		text {
			margin-left: 10rpx;
		}
	}
	.order-footer {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		.order-button {
			min-width: 150rpx;
			height: 60rpx;
			border-radius: 30rpx;
			font-size: 28rpx;
			color: #616b80;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;
			padding: 0 20rpx;
			margin: 0 0 0 20rpx;
			&::after {
				border-radius: 60rpx;
			}
			&.active {
				color: #fa3534;
				&::after {
					border-color: #fa3534;
				}
			}
		}
	}
}
</style>
