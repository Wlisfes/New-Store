<template>
	<view class="app-container">
		<view class="amount">{{ balance.toLocaleString() }}</view>
	</view>
</template>

<script>
export default {
	name: 'Wallet',
	data() {
		return {
			balance: '1000.00'
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background: linear-gradient(#ff5a47 0%, #ff5a47 200rpx, #f5f7fa 200rpx);
	overflow: hidden;
	.amount {
		height: 200rpx;
		color: #ffffff;
		font-size: 64rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 20rpx;
	}
}
</style>
