<template>
	<view class="app-container">
		<view class="list">
			<view
				class="list-item"
				v-for="item in scroll.dataSource"
				:key="item.id"
				@click="() => navigateTo(`/pages/common/product?id=${item.product.id}`)"
			>
				<view class="back-image">
					<u-image width="200rpx" height="200rpx" :src="item.product.picUrl" mode="widthFix">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
				<view class="list-content">
					<view class="title u-line-2">{{ item.product.title }}</view>
					<view class="format">
						<!-- <text class="u-line-1">规格：</text> -->
					</view>
					<view class="coin">
						<view class="coin-num u-line-1">{{ `¥${item.product.price / 100 || '0.00'}` }}</view>
						<view v-if="false" @click="() => onDelStar(item.id)">
							<u-icon name="trash" color="#99a0ad" size="40"></u-icon>
						</view>
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
					label="你还没有收藏任何商品噢"
					label-color="#99a0ad"
					label-pos="bottom"
					size="200"
					name="/static/icons/1606631363333.png"
				></u-icon>
			</view>
		</view>
		<view class="app-loading" v-if="isLoading">
			<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
		</view>
		<u-back-top :scroll-top="scroll.scrollTop"></u-back-top>
	</view>
</template>

<script>
import { userStar, delStar } from '@/api/star'
export default {
	name: 'Favorite',
	data() {
		return {
			scroll: {
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true,
				scrollTop: 0
			}
		}
	},
	computed: {
		isLoading() {
			return this.scroll.total === 0 && this.scroll.loading
		},
		//没有更多数据了
		isEmpty() {
			return this.scroll.total > 0 && this.scroll.total === this.scroll.offset && !this.scroll.loading
		},
		//空列表
		isEmpty1() {
			return this.scroll.total === 0 && !this.scroll.loading
		},
		//是否还有更多加载
		isMore() {
			return this.scroll.offset < this.scroll.total
		}
	},
	onLoad() {
		this.userStar()
	},
	//滚动事件
	onPageScroll(e) {
		this.scroll.scrollTop = e.scrollTop
	},
	//下拉刷新
	async onPullDownRefresh() {
		this.scroll.offset = 0
		this.scroll.loading = true
		await this.userStar()
		uni.stopPullDownRefresh()
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.userStar(true)
		}
	},
	methods: {
		//我的收藏列表
		async userStar(concat) {
			const { offset, limit, total, dataSource } = this.scroll
			const response = await userStar({ offset, limit })
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
		},
		//取消收藏
		async onDelStar(id) {
			uni.showModal({
				title: '提示',
				content: '这是一个模态弹窗',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定')
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
			// uni.showLoading({title: '加载中'})
			// const response = await delStar({ id })
			// if (response.code === 200) {
			// 	uni.showToast({ title: '删除成功', icon: 'none' })

			// } else {
			// 	uni.showToast({ title: response.message, icon: 'none' })
			// }
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #ffffff;
	.app-loading {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 48rpx;
	}
}
.list {
	padding: 0 20rpx;
	overflow: hidden;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	&-item {
		display: flex;
		border-radius: 12rpx;
		overflow: hidden;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 14rpx 2rpx rgba(0, 0, 0, 0.2);
		&:last-child {
			margin-bottom: 30rpx;
		}
		.back-image {
			border-radius: 8rpx;
			overflow: hidden;
			background-color: #f5f7fa;
		}
	}
	&-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		.title {
			height: 80rpx;
			line-height: 40rpx;
			overflow: hidden;
		}
		.format {
			flex: 1;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #99a0ad;
		}
		.coin {
			display: flex;
			align-items: center;
			&-num {
				flex: 1;
				font-size: 26rpx;
				color: #fa3534;
			}
		}
	}
}
</style>
