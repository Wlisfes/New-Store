<template>
	<view class="app-container">
		<view class="address" @click="() => navigateTo('/pages/mine/address')">
			<block v-if="under">
				<u-image :width="80" :height="80" src="/static/icons/1606631320132.png">
					<u-loading slot="loading"></u-loading>
				</u-image>
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
			<block v-if="!loading">
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
							<view>¥{{ (item.sku.price / 100).toFixed(2) || '0.00' }}</view>
							<view class="order-info-number">{{ `x${item.some}` }}</view>
						</view>
					</view>
				</view>
				<view class="list-footer">
					<view class="list-under">
						<text class="list-under-lable">商品总额</text>
						<view class="list-under-content u-line-1">
							<text class="u-line-1">¥{{ (total / 100).toFixed(2) || '0.00' }}</text>
						</view>
					</view>
					<view class="list-under u-border-top" @click="coupon.onNavigateTo">
						<text class="list-under-lable">优惠劵</text>
						<view class="list-under-content">
							<block v-if="coupon.dataSource.length === 0">
								<text :style="{ color: '#99a0ad' }">暂无优惠劵</text>
							</block>
							<block v-else-if="coupon.id === 0">
								<text :style="{ color: '#99a0ad' }">请选择优惠劵</text>
							</block>
							<block v-else>
								<text :style="{ color: '#fa3534' }">
									{{ `-¥${(coupon.discount / 100).toFixed(2) || '0.00'}` }}
								</text>
							</block>
						</view>
						<u-icon :size="30" name="arrow-right" color="#99a0ad"></u-icon>
					</view>
					<view class="list-under u-border-top" @click="navigateTo(`/pages/common/leave`)">
						<text class="list-under-lable">买家留言</text>
						<view class="list-under-content">
							<block v-if="leave">
								<text class="u-line-1">{{ leave }}</text>
							</block>
							<block v-else>
								<text :style="{ color: '#99a0ad' }">请留言 (选填)</text>
							</block>
						</view>
					</view>
					<view class="list-under">
						<view class="list-under-total">
							<text>合计:</text>
							<text class="total-number">¥{{ (calcTotal / 100).toFixed(2) || '0.00' }}</text>
						</view>
					</view>
				</view>
			</block>
			<view class="app-loading" v-else>
				<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
			</view>
		</view>
		<view class="app-under">
			<view class="app-under-container">
				<view class="whole">
					<text>总计: ¥{{ (calcTotal / 100).toFixed(2) || '0.00' }}</text>
				</view>
				<u-button
					shape="circle"
					size="medium"
					:hair-line="false"
					type="error"
					:custom-style="{ padding: '0 40rpx', height: '68rpx' }"
					@click="createOrder"
				>
					<text>确认支付</text>
				</u-button>
			</view>
		</view>

		<AppKeyboardPay
			:visible="order.visible"
			:total="order.total"
			:order="order.id"
			@close="order.onClose"
			@submit="order.onSubmit"
		></AppKeyboardPay>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { wheeAnd } from '@/api/whee'
import { address } from '@/api/address'
import { userCoupon } from '@/api/coupon'
import { createOrder } from '@/api/order'
import AppKeyboardPay from '@/components/common/AppKeyboardPay'
export default {
	name: 'Under',
	components: {
		AppKeyboardPay
	},
	data() {
		return {
			under: null,
			leave: '',
			dataSource: [],
			loading: true,
			coupon: {
				id: 0,
				discount: 0,
				total: 0,
				dataSource: [],
				onNavigateTo: () => {
					this.navigateTo(`/pages/common/coupon?id=${this.coupon.id}&total=${this.total}`)
				},
				onClick: props => {
					this.coupon.id = props.id
					this.coupon.discount = props.discount
				}
			},
			order: {
				id: 0,
				visible: false,
				onClick: async props => {
					this.order.total = props.total
					this.order.id = props.id
					this.order.visible = true
					return
				},
				onClose: () => {
					this.order.id = 0
					this.order.visible = false
					uni.redirectTo({ url: `/pages/mine/order` })
				},
				onSubmit: () => {
					this.order.id = 0
					this.order.visible = false
					this.$store.dispatch('user/AuthCount')
					uni.redirectTo({ url: `/pages/mine/order` })
				}
			}
		}
	},
	computed: {
		...mapState({
			uid: state => state.user.uid
		}),
		total() {
			return this.dataSource.map(k => k.sku.price * k.some).reduce((prev, curr) => prev + curr, 0)
		},
		calcTotal() {
			return this.total - this.coupon.discount
		}
	},
	onLoad(options) {
		Promise.all([this.wheeAnd(), this.address(), this.userCoupon()]).finally(() => {
			this.loading = false
		})
		uni.$on('under-coupon', this.coupon.onClick)
	},
	onUnload() {
		uni.$off('under-coupon', this.coupon.onClick)
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
			const { ids } = this.useOptions()
			const response = await wheeAnd({ ids: ids.split(',') })
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
		},
		//我的优惠劵
		async userCoupon() {
			const response = await userCoupon({ status: 1, limit: 50 })
			const { code, data } = response
			if (code === 200) {
				this.coupon.total = data.total
				this.coupon.dataSource = data.list
			}
			return response
		},
		//创建订单
		async createOrder() {
			const { ids } = this.useOptions()
			const response = await createOrder({
				ids: ids.split(','),
				address: this.under.id,
				coupon: this.coupon.id,
				leave: this.leave
			})
			const { code, data, message } = response
			if (code === 200) {
				await this.order.onClick({
					id: data.id,
					total: data.total - data.discount
				})
				await this.$store.dispatch('whee/list')
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
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
	.app-loading {
		text-align: center;
		padding: 48rpx;
	}
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
	margin: 0 20rpx 130rpx;
	border-radius: 12rpx;
	overflow: hidden;
	.list {
		overflow: hidden;
		background-color: #ffffff;
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
	.list-footer {
		margin-top: 20rpx;
		padding: 0 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		.list-under {
			height: 88rpx;
			display: flex;
			align-items: center;
			overflow: hidden;
			&-lable {
				width: 180rpx;
				font-size: 32rpx;
				color: #141f33;
				font-weight: 500;
			}
			&-content {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				margin-right: 10rpx;
				font-size: 30rpx;
				color: #141f33;
				overflow: hidden;
			}
			&-total {
				font-size: 30rpx;
				color: #141f33;
				margin-left: auto;
				.total-number {
					color: #fa3534;
					margin: 0 10rpx;
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
