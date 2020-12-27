<template>
	<view class="app-order">
		<view class="app-order-item" v-for="props in dataSource" :key="props.id">
			<view class="order-title">
				<text :style="{ flex: 1, fontWeight: 500 }">订单号: {{ props.order }}</text>
				<text :style="{ color: '#fa3534', fontSize: '26rpx' }">{{ transform(props.status) }}</text>
			</view>
			<view class="order-container" v-for="item in props.whee" :key="item.id" @click.prevent="onStore(item)">
				<u-image width="200rpx" height="200rpx" :src="item.product.picUrl" mode="widthFix" :border-radius="6">
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
			<view class="order-total">
				<text>{{ `总价¥${(props.total / 100).toFixed(2) || '0.00'}` }}</text>
				<text v-if="props.discount">{{ `优惠¥${(props.discount / 100).toFixed(2) || '0.00'}` }}</text>
				<block v-if="[2, 3, 4].includes(props.status)">
					<text>实付款</text>
					<text :style="{ fontSize: '30rpx', fontWeight: 500 }">
						{{ `¥${((props.total - props.discount) / 100).toFixed(2) || '0.00'}` }}
					</text>
				</block>
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
					<button class="order-button" hover-class="none" @click="onSubmit(props, 1)">加入购物车</button>
					<block v-if="props.status === 1">
						<button class="order-button" hover-class="none" @click="onSubmit(props, 2)">删除订单</button>
						<button class="order-button active" hover-class="none" @click="onSubmit(props, 3)">付款</button>
					</block>
					<block v-if="props.status === 2">
						<button class="order-button" hover-class="none" @click="onSubmit(props, 4)">修改地址</button>
					</block>
					<block v-else-if="props.status === 3">
						<button class="order-button" hover-class="none" @click="onSubmit(props, 5)">查看物流</button>
						<button class="order-button active" hover-class="none" @click="onSubmit(props, 6)">
							确认收货
						</button>
					</block>
					<block v-else-if="props.status === 4">
						<button class="order-button" hover-class="none" @click="onSubmit(props, 5)">查看物流</button>
						<button class="order-button active" hover-class="none" @click="onSubmit(props, 7)">评价</button>
					</block>
				</view>
			</view>
		</view>
		<view class="app-loading" v-if="isMore">
			<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
		</view>
		<view class="app-loading" v-if="isEmpty">
			<u-divider bg-color="rgba(0,0,0,0)">没有更多了</u-divider>
		</view>
		<view class="app-loading" v-if="isEmpty1">
			<u-icon
				label="暂无相关订单"
				label-color="#99a0ad"
				label-pos="bottom"
				size="200"
				name="/static/icons/1606631349285.png"
			></u-icon>
		</view>
	</view>
</template>

<script>
import { delOrder, incomeOrder } from '@/api/order'
import { createOrderWhee } from '@/api/whee'
export default {
	name: 'AppOrder',
	props: {
		dataSource: {
			type: Array,
			default: () => []
		},
		total: {
			type: Number,
			default: 0
		},
		offset: {
			type: Number,
			default: 0
		},
		loading: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		//没有更多数据了
		isEmpty() {
			return this.total > 0 && this.total === this.offset && !this.loading
		},
		//空列表
		isEmpty1() {
			return this.total === 0 && !this.loading
		},
		//是否还有更多加载
		isMore() {
			return this.offset < this.total
		}
	},
	methods: {
		transform(index) {
			return ['已取消', '等待买家付款', '等待卖家发货', '等待买家收货', '订单已完成'][index]
		},
		onStore(params) {
			this.$emit('store', { id: params.product.id })
		},
		//加入购物车
		async createOrderWhee(id) {
			uni.showLoading({ title: '加载中...' })
			const response = await createOrderWhee({ order: id })
			const { code, message } = response
			if (code === 200) {
				await this.$store.dispatch('whee/list')
				uni.showToast({ title: '添加成功' })
				this.$emit('refresh')
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
			return response
		},
		//删除订单
		async delOrder(id) {
			uni.showLoading({ title: '加载中...' })
			const response = await delOrder({ id })
			const { code, message } = response
			if (code === 200) {
				uni.showToast({ title: '删除成功' })
				this.$emit('refresh')
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
			return response
		},
		//确认收货
		async incomeOrder(id) {
			uni.showLoading({ title: '加载中...' })
			const response = await incomeOrder({ id })
			const { code, message } = response
			if (code === 200) {
				uni.showToast({ title: '收货成功' })
				this.$emit('refresh')
			} else {
				uni.showToast({ title: message, icon: 'none' })
			}
			return response
		},
		async onSubmit(params, int) {
			console.log(int)
			switch (int) {
				case 1:
					await this.createOrderWhee(params.id)
					break
				case 2:
					await this.delOrder(params.id)
					break
				case 3:
					this.$emit('submit', {
						int,
						id: params.id,
						total: params.total - params.discount
					})
					break
				case 4:
					//修改地址
					uni.showToast({ title: '功能暂未开放', icon: 'none' })
					break
				case 5:
					//查看物流
					uni.showToast({ title: '功能暂未开放', icon: 'none' })
					break
				case 6:
					this.$emit('submit', {
						int,
						id: params.id,
						total: params.total - params.discount
					})
					break
				case 7:
					//评价
					uni.showToast({ title: '功能暂未开放', icon: 'none' })
					break
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-order {
	padding: 0 20rpx;
	overflow: hidden;
	background-color: #ffffff;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.app-loading {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 48rpx;
	}
	&-item {
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 14rpx 2rpx rgba(0, 0, 0, 0.2);
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
