<template>
	<view class="app-container">
		<view class="app-navs u-border-bottom">
			<u-tabs-swiper
				active-color="#ffb41f"
				inactive-color="#141f33"
				:height="80"
				:bar-width="64"
				:is-scroll="false"
				:list="scroll.list"
				:current="scroll.current"
				@change="scroll.onChange"
			></u-tabs-swiper>
		</view>
		<view class="container">
			<view class="app-loading" v-if="isLoading">
				<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
			</view>
			<AppOrder
				:dataSource="scroll.dataSource"
				:offset="scroll.offset"
				:total="scroll.total"
				:loading="scroll.loading"
				@store="props => navigateTo(`/pages/common/product?id=${props.id}`)"
				@submit="scroll.onSubmit"
			></AppOrder>
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
import { orderList } from '@/api/order'
import AppOrder from '@/components/common/order'
import AppKeyboardPay from '@/components/common/keyboardPay'
export default {
	name: 'Order',
	components: {
		AppOrder,
		AppKeyboardPay
	},
	data() {
		return {
			order: {
				id: 0,
				visible: false,
				total: 0,
				onClose: () => {
					this.order.id = 0
					this.order.visible = false
				},
				onSubmit: () => {}
			},
			scroll: {
				current: 0,
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true,
				scrollTop: 0,
				list: [
					{ name: '全部' },
					{ name: '待付款' },
					{ name: '待发货' },
					{ name: '待收货' },
					{ name: '已完成' }
				],
				onChange: async index => {
					this.scroll.current = index
					this.scroll.offset = 0
					this.scroll.dataSource = []
					this.scroll.loading = true
					await this.orderList()
				},
				onSubmit: props => {
					console.log(props)
					if (props.int === 3) {
						this.order.total = props.total
						this.order.id = props.id
						this.order.visible = true
					}
				}
			}
		}
	},
	computed: {
		isLoading() {
			return this.scroll.total === 0 && this.scroll.loading
		}
	},
	onLoad(options) {
		this.scroll.current = Number(options.current || 0)
		this.orderList()
	},
	//下拉刷新
	async onPullDownRefresh() {
		this.scroll.offset = 0
		this.scroll.loading = true
		await this.orderList()
		uni.stopPullDownRefresh()
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.orderList(true)
		}
	},
	methods: {
		//订单列表
		async orderList(concat) {
			const { offset, limit, total, dataSource, current } = this.scroll
			const response = await orderList({
				offset,
				limit,
				status: current
			})
			const { code, data } = response
			if (code === 200) {
				if (concat) {
					this.scroll.offset = offset + data.list.length
					this.scroll.dataSource = dataSource.concat(data.list)
				} else {
					this.scroll.offset = data.list.length
					this.scroll.dataSource = data.list
				}
				this.scroll.total = data.total
			}
			this.scroll.loading = false
			return response
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #ffffff;
	.app-navs {
		position: sticky;
		top: 0;
		background-color: #ffffff;
		z-index: 9;
		box-shadow: 0rpx 8rpx 6rpx -6rpx rgba(0, 0, 0, 0.2);
	}
	.container {
		flex: 1;
	}
	.app-loading {
		text-align: center;
		padding: 32rpx;
	}
}
</style>
