<template>
	<view class="app-footer">
		<view class="left">
			<button class="u-reset-button item" open-type="contact">
				<u-icon name="server-fill" :size="40"></u-icon>
				<view class="text u-line-1">客服</view>
			</button>
			<view class="item car">
				<u-badge class="car-num" :count="99" type="error" :offset="[-3, -6]"></u-badge>
				<u-icon name="shopping-cart" :size="40"></u-icon>
				<view class="text u-line-1">购物车</view>
			</view>
		</view>
		<view class="right">
			<u-button size="default" :hair-line="false" shape="circle" type="error">加入购物车</u-button>
			<u-button size="default" :hair-line="false" shape="circle" type="warning">立即购买</u-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.app-footer {
	display: flex;
	background-color: #ffffff;
	padding-bottom: constant(safe-area-inset-bottomm, 16rpx);
	padding-bottom: env(safe-area-inset-bottom, 16rpx);
	.left {
		display: flex;
		font-size: 20rpx;
		margin: 16rpx 0;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
			&.u-reset-button {
				margin: 0;
				padding: 0 30rpx;
			}
		}
	}
	.right {
		margin: 16rpx 0;
		flex: 1;
		display: flex;
		justify-content: space-between;
	}
}
</style>
