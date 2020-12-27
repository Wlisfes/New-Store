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
			<AppCoupon
				:status="scroll.current"
				:dataSource="scroll.dataSource"
				:offset="scroll.offset"
				:total="scroll.total"
				:loading="scroll.loading"
			></AppCoupon>
		</view>

		<u-back-top :scroll-top="scroll.scrollTop"></u-back-top>
	</view>
</template>

<script>
import { userCoupon } from '@/api/coupon'
import AppCoupon from '@/components/common/AppCoupon'
export default {
	name: 'Coupon',
	components: {
		AppCoupon
	},
	data() {
		return {
			scroll: {
				current: 0,
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true,
				scrollTop: 0,
				list: [{ name: '可使用' }, { name: '已使用' }, { name: '已过期' }],
				onChange: async current => {
					this.scroll.current = current
					this.scroll.offset = 0
					this.scroll.dataSource = []
					this.scroll.loading = true
					await this.userCoupon()
				}
			}
		}
	},
	computed: {
		isLoading() {
			return this.scroll.total === 0 && this.scroll.loading
		}
	},
	onLoad() {
		this.userCoupon()
	},
	//滚动事件
	onPageScroll(e) {
		this.scroll.scrollTop = e.scrollTop
	},
	//下拉刷新
	async onPullDownRefresh() {
		this.scroll.offset = 0
		this.scroll.loading = true
		await this.userCoupon()
		uni.stopPullDownRefresh()
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.userCoupon(true)
		}
	},
	methods: {
		//我的优惠劵
		async userCoupon(concat) {
			const { offset, limit, total, dataSource, current } = this.scroll
			const response = await userCoupon({
				offset,
				limit,
				status: current + 1
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
