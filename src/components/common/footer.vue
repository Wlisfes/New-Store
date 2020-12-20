<template>
	<view class="app-footer u-border-top">
		<view class="app-item u-border-bottom u-border-right">
			<button class="u-reset-button" open-type="contact">
				<u-icon name="server-fill" :size="38" color="#616b80"></u-icon>
				<view class="text u-line-1">客服</view>
			</button>
		</view>
		<view class="app-item u-border-bottom u-border-right">
			<u-badge :count="100" type="error" size="mini" :offset="[5, 2]"></u-badge>
			<u-icon name="shopping-cart" :size="38" color="#616b80"></u-icon>
			<view class="text u-line-1">购物车</view>
		</view>
		<view class="app-item u-border-bottom u-border-right">
			<u-icon name="star" :size="38" color="#616b80"></u-icon>
			<view class="text u-line-1">收藏</view>
		</view>
		<view class="app-button u-border-bottom" :style="{ paddingLeft: '20rpx' }">
			<button class="u-reset-button sub-bottom" :style="{ backgroundColor: app.error }">
				<text>加入购物车</text>
			</button>
		</view>
		<view class="app-button u-border-bottom" :style="{ paddingRight: '20rpx' }">
			<button class="u-reset-button sub-bottom" :style="{ backgroundColor: app.warning }">
				<text>立即购买</text>
			</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppFooter',
	data() {
		return {
			app: {
				warning: '#ff9900',
				error: '#fa3534'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-footer {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	position: relative;
	.app-button {
		flex: 1;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 8rpx;
		.sub-bottom {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			font-size: 28rpx;
			color: #ffffff;
		}
	}
	.app-item {
		width: 110rpx;
		height: 100rpx;
		position: relative;
		font-size: 20rpx;
		color: #141f33;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.u-reset-button {
			margin: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
