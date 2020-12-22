<template>
	<view class="app-container">
		<view class="address" @click="() => navigateTo('/pages/mine/address')">
			<block v-if="under">
				<u-image :width="80" :height="80" src="/static/icons/1606631320132.png"></u-image>
				<view class="address-content">
					<view class="user">
						<text class="user-name">{{ under.name }}</text>
						<text class="user-moblie">{{ under.mobile }}</text>
					</view>
					<view class="u-line-1">{{ `${under.region}${under.address}` }}</view>
				</view>
				<u-icon name="arrow-right" color="#99a0ad"></u-icon>
			</block>
			<block v-else>
				<view class="address-box">
					<u-icon name="plus" :size="40" color="#99a0ad"></u-icon>
					<view :style="{ marginLeft: '10rpx', flex: 1 }">增加收货地址</view>
					<u-icon name="arrow-right" color="#99a0ad"></u-icon>
				</view>
			</block>
		</view>
		<view class="container">
			<view class="list">
				<view class="list-item" v-for="item in dataSource" :key="item.id">
					<u-image
						width="200rpx"
						height="200rpx"
						:src="item.product.picUrl"
						mode="widthFix"
						:border-radius="6"
					>
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="content">
						<view class="content-name">
							<text class="u-line-2">{{ item.product.title }}</text>
						</view>
						<view class="content-format">
							<text class="u-line-1">规格：{{ item.sku.skuname }}</text>
						</view>
					</view>
					<view class="order-info">
						<view>¥{{ item.sku.price / 100 || '0.00' }}</view>
						<view class="order-info-number">{{ `x${item.some}` }}</view>
					</view>
				</view>
			</view>
			daskldjas
		</view>

		<view class="app-under">
			<view class="app-under-container">
				<view class="whole">
					<text>合计: ¥{{ total / 100 || '0.00' }}</text>
				</view>
				<u-button
					shape="circle"
					size="medium"
					:hair-line="false"
					type="error"
					:custom-style="{ padding: '0 40rpx', height: '68rpx' }"
				>
					<text>确认支付</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { wheeAnd } from '@/api/whee'
import { address } from '@/api/address'
export default {
	name: 'Under',
	data() {
		return {
			under: null,
			dataSource: []
		}
	},
	computed: {
		...mapState({
			uid: state => state.user.uid
		}),
		total() {
			return this.dataSource.map(k => k.sku.price * k.some).reduce((prev, curr) => prev + curr, 0)
		}
	},
	onLoad(options) {
		setTimeout(() => {
			this.wheeAnd()
			this.address()
		}, 500)
	},
	//下拉刷新
	async onPullDownRefresh() {
		await this.address()
		await this.wheeAnd()
		uni.stopPullDownRefresh()
	},
	methods: {
		//批量获取购物车
		async wheeAnd() {
			// const { ids } = this.useOptions()
			const response = await wheeAnd({ ids: [1, 2, 3, 4, 5, 6] }) //JSON.parse(ids) })
			if (response.code === 200) {
				this.dataSource = response.data
			}
			return response
		},
		//获取默认地址
		async address() {
			const response = await address()
			if (response.code === 200) {
				this.under = response.data
			}
			return response
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background: linear-gradient(#ffb41f 0%, #ffb41f 100rpx, #f5f7fa 100rpx);
	overflow: hidden;
	padding-bottom: constant(safe-area-inset-bottomm);
	padding-bottom: env(safe-area-inset-bottom);
	.address {
		height: 160rpx;
		display: flex;
		align-items: center;
		border-radius: 12rpx;
		background-color: #ffffff;
		margin: 30rpx 20rpx;
		padding: 0 10rpx;
		.user {
			height: 48rpx;
			display: flex;
			align-items: center;
			&-name {
				font-size: 32rpx;
				color: #141f33;
				font-weight: 500;
			}
			&-moblie {
				font-size: 28rpx;
				color: #141f33;
				margin-left: 20rpx;
			}
		}
		&-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			color: #616b80;
			margin-left: 20rpx;
		}
		&-box {
			flex: 1;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			color: #616b80;
			margin: 0 20rpx;
		}
	}
}
.container {
	background-color: #ffffff;
	margin: 0 20rpx 130rpx;
	border-radius: 12rpx;
	overflow: hidden;
	.list {
		overflow: hidden;
		&-item {
			display: flex;
			margin: 20rpx;
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
				color: #fa3534;
				&-number {
					font-size: 24rpx;
					color: #616b80;
					line-height: 1;
				}
			}
		}
	}
}
.app-under {
	background-color: #ffffff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding-bottom: constant(safe-area-inset-bottomm);
	padding-bottom: env(safe-area-inset-bottom);
	&-container {
		height: 100rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}
	.whole {
		flex: 1;
		font-size: 32rpx;
		color: #fa3534;
		font-weight: 500;
	}
}
</style>
