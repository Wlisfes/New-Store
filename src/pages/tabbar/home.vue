<template>
	<view class="app-container">
		<u-search
			placeholder="日照香炉生紫烟"
			input-align="center"
			margin="0 30rpx 30rpx"
			:disabled="true"
			:show-action="false"
			@click="onSearch"
		></u-search>
		<view class="app-swiper">
			<u-swiper :list="banners" name="picUrl" @click="onSwipeClick"></u-swiper>
		</view>
		<view class="classify" v-if="classify.length">
			<view class="classify-item" v-for="(k, index) in classify" :key="index">
				<u-image width="110rpx" height="110rpx" :src="k.picUrl" mode="widthFix">
					<u-loading slot="loading"></u-loading>
				</u-image>
				<text class="classify-name">{{ k.name }}</text>
			</view>
		</view>
		<view class="hotcell" v-if="hotcell.length">
			<u-section
				title="热销推荐"
				sub-title="查看更多"
				:font-size="32"
				color="#141f33"
				sub-color="#616b80"
			></u-section>
			<scroll-view class="hotcell-scroll" :scroll-x="true">
				<view
					class="hotcell-item"
					v-for="(k, index) in hotcell"
					:key="index"
					@click="() => navigateTo(`/pages/home/product?id=${k.product.id}`)"
				>
					<view class="hotcell-image">
						<u-image width="100%" height="100%" :src="k.product.picUrl" mode="widthFix" :border-radius="6">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<view class="hotcell-name u-line-1">{{ k.product.title }}</view>
					<view class="hotcell-amount">
						<text>{{ `¥${k.product.price / 100 || '0.00'}` }}</text>
						<text class="amount-inverse">{{ `¥${k.product.suprice / 100 || '0.00'}` }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="list">
			<view class="list-title">
				<u-section title="猜你喜欢" :font-size="32" color="#141f33" :right="false"></u-section>
			</view>
			<view class="list-container">
				<view
					class="list-item"
					v-for="k in scroll.dataSource"
					:key="k.id"
					@click="() => navigateTo(`/pages/home/product?id=${k.id}`)"
				>
					<u-image width="200rpx" height="200rpx" :src="k.picUrl" mode="widthFix" :border-radius="6">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="list-content">
						<view class="list-content-title u-line-2">{{ k.title }}</view>
						<view :style="{ flex: 1 }"></view>
						<view class="list-content-amount">
							<text :style="{ fontWeight: 500 }">{{ `¥${k.price / 100 || '0.00'}` }}</text>
							<text class="amount-inverse">{{ `¥${k.suprice / 100 || '0.00'}` }}</text>
						</view>
						<view class="list-content-footer">
							<view class="sales">{{ `已销 ${k.sales} 笔` }}</view>
							<block v-for="(item, index) in k.coupon" :key="item.id">
								<u-tag
									v-if="index < 2"
									:text="`满${item.satisfy / 100}减${item.discount / 100}`"
									style="margin: 0 4rpx;"
									mode="light"
									shape="circle"
									size="mini"
									type="error"
								/>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="app-loading" v-if="isMore">
				<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
			</view>
			<view class="app-loading" v-if="isEmpty">
				<u-divider>没有更多了</u-divider>
			</view>
		</view>
		<view class="app-loading" v-if="isLoading">
			<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { banner, hotwell } from '@/api/home'
import { source, productLove } from '@/api/common'
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			classify: [],
			hotcell: [],
			scroll: {
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true
			}
		}
	},
	computed: {
		...mapState({
			openid: state => state.openid
		}),
		//新品推荐首次加载动画
		isLoading() {
			return this.scroll.total === 0 && this.scroll.loading
		},
		//新品推荐没有更多数据了
		isEmpty() {
			return this.scroll.total === this.scroll.offset && !this.scroll.loading
		},
		//新品推荐是否还有更多加载
		isMore() {
			return this.scroll.offset < this.scroll.total
		}
	},
	onLoad(e) {
		this.banner()
		this.source()
		this.hotwell()
		this.productLove()
	},
	//下拉刷新
	onPullDownRefresh() {
		this.scroll.offset = 0
		this.scroll.loading = true
		Promise.all([this.banner(), this.source(), this.hotwell(), this.productLove()]).finally(() => {
			uni.stopPullDownRefresh()
		})
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.productLove(true)
		}
	},
	onShareAppMessage() {},
	methods: {
		//banner轮播图
		async banner() {
			const response = await banner()
			if (response.code === 200) {
				this.banners = response.data
				return response
			}
		},
		//分类列表
		async source() {
			const response = await source()
			if (response.code === 200) {
				this.classify = response.data
				return response
			}
		},
		//热销列表
		async hotwell() {
			const response = await hotwell()
			if (response.code === 200) {
				this.hotcell = response.data
				return response
			}
		},
		//新品推荐
		async productLove(concat) {
			const { offset, limit, dataSource } = this.scroll
			const response = await productLove({ offset, limit })
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
				this.scroll.loading = false
				return response
			}
		},
		onSwipeClick(index) {
			const { proid } = this.banners[index]
			this.navigateTo(`/pages/home/product?id=${proid}`)
		},
		onSearch() {}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	overflow: hidden;
	.app-swiper {
		margin: 0 30rpx;
		position: relative;
	}
	.app-loading {
		text-align: center;
		padding: 32rpx;
	}
}

.classify {
	display: flex;
	flex-wrap: wrap;
	margin: 0 20rpx;
	&-item {
		width: 20%;
		padding: 0 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 36rpx;
	}
	&-name {
		font-size: 26rpx;
		color: #141f33;
		text-align: center;
		margin-top: 10rpx;
	}
}
.hotcell {
	margin: 36rpx 30rpx 0;
	&-scroll {
		white-space: nowrap;
		margin: 30rpx 0 0;
	}
	&-item {
		display: inline-block;
		width: 240rpx;
		padding-right: 30rpx;
		&:last-child {
			width: 210rpx;
			padding-right: 0;
		}
	}
	&-image {
		width: 210rpx;
		height: 210rpx;
		background-color: #f5f7fa;
		border-radius: 8rpx;
	}
	&-name {
		font-size: 30rpx;
		color: #141f33;
		margin-top: 16rpx;
		text-align: center;
	}
	&-amount {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 26rpx;
		color: #fa3534;
		.amount-inverse {
			font-size: 24rpx;
			color: #99a0ad;
			text-decoration: line-through;
		}
	}
}
.list {
	background-color: #ffffff;
	&-title {
		margin: 30rpx 30rpx 0;
	}
	&-container {
		padding-bottom: 30rpx;
	}
	&-item {
		background-color: #ffffff;
		border-radius: 12rpx;
		display: flex;
		padding: 15rpx;
		margin: 30rpx 30rpx 0;
		box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.15);
	}
	&-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		&-title {
			font-size: 30rpx;
			color: #141f33;
		}
		&-amount {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			color: #fa3534;
			.amount-inverse {
				font-size: 24rpx;
				color: #99a0ad;
				text-decoration: line-through;
				margin-left: 12rpx;
			}
		}
		&-footer {
			display: flex;
			align-items: center;
			.sales {
				font-size: 20rpx;
				color: #99a0ad;
				margin-right: 10rpx;
			}
		}
	}
}
</style>
