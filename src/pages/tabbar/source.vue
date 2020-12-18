<template>
	<view class="app-container">
		<view class="source-header" @touchmove.stop>
			<u-search
				placeholder="日照香炉生紫烟"
				input-align="center"
				margin="0 30rpx 30rpx"
				:disabled="true"
				:show-action="false"
			></u-search>
			<view class="nav-tabs" v-if="form.navs.length">
				<u-tabs
					:list="form.navs"
					:current="form.current"
					:show-bar="false"
					:height="56"
					:font-size="28"
					:bold="false"
					:bar-height="0"
					active-color="#ffffff"
					:active-item-style="{ backgroundColor: '#ffb41f' }"
					@change="form.onChange"
				></u-tabs>
			</view>
			<view class="nav-sort" v-if="form.navs.length">
				<text class="sort-name" :class="{ active: form.sort === 1 }" @click="form.onSort(1)">综合</text>
				<text class="sort-name" :class="{ active: form.sort === 2 }" @click="form.onSort(2)">销量</text>
				<text class="sort-name" :class="{ active: form.sort === 3 }" @click="form.onSort(3)">价格</text>
			</view>
		</view>

		<view class="scroll">
			<view class="list">
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
							<view class="sales">{{ `月销 ${k.sales} 笔` }}</view>
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
				<view class="app-loading" v-if="isMore">
					<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
				</view>
				<view class="app-loading" v-if="isEmpty">
					<u-divider bg-color="#f5f7fa">没有更多了</u-divider>
				</view>
			</view>
			<view class="app-loading" v-if="isLoading">
				<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
			</view>
		</view>
		<u-back-top :scroll-top="scroll.scrollTop"></u-back-top>
	</view>
</template>

<script>
import { source, sourceProduct } from '@/api/common'
export default {
	name: 'Source',
	data() {
		return {
			form: {
				sticky: false,
				current: 0,
				sort: 1,
				navs: [],
				onSort: sort => {
					this.form.sort = sort
					this.scroll.onRefresh()
				},
				onChange: index => {
					this.form.current = index
					this.scroll.onRefresh()
				}
			},
			scroll: {
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true,
				scrollTop: 0,
				onRefresh: async () => {
					this.scroll.loading = true
					this.scroll.offset = 0
					this.scroll.total = 0
					this.scroll.dataSource = []
					await this.sourceProduct()
				}
			}
		}
	},
	computed: {
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
	async onLoad() {
		await this.source()
		await this.sourceProduct()
	},
	//滚动事件
	onPageScroll(e) {
		this.scroll.scrollTop = e.scrollTop
	},
	//下拉刷新
	async onPullDownRefresh() {
		this.scroll.loading = true
		this.scroll.offset = 0
		this.scroll.total = 0
		await this.sourceProduct()
		uni.stopPullDownRefresh()
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.sourceProduct(true)
		}
	},
	methods: {
		//分类列表
		async source() {
			const response = await source()
			if (response.code === 200) {
				this.form.navs = response.data
				return response
			}
		},
		//分类商品
		async sourceProduct(concat) {
			const { navs, sort, current } = this.form
			const { offset, limit, dataSource } = this.scroll
			const response = await sourceProduct({
				sort,
				offset,
				limit,
				source: navs[current].id
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
				this.scroll.loading = false
				return response
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	.app-loading {
		text-align: center;
		padding: 32rpx;
	}
}
.source-header {
	display: flex;
	flex-direction: column;
	position: sticky;
	top: 0;
	background-color: #ffffff;
	z-index: 9;
	.nav-tabs {
		padding: 0 30rpx;
		position: relative;
		z-index: 9;
		/deep/ .u-tab-item {
			background-color: #f0f2f5;
			margin-right: 24rpx;
			border-radius: 8rpx;
			color: #141f33;
		}
	}
	.nav-sort {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
		color: #141f33;
		line-height: 80rpx;
		padding: 0 12rpx;
		.sort-name {
			padding: 0 24rpx;
			transition: all 300ms;
			&.active {
				color: #ffb41f;
			}
		}
	}
}
.scroll {
	flex: 1;
	overflow: hidden;
	background-color: #f5f7fa;
	position: relative;
	transition: margin 300ms;
	&.active {
		margin-top: 100rpx;
	}
	&-context {
		height: 100%;
		overflow: hidden;
	}
}
.list {
	background-color: #f5f7fa;
	overflow: hidden;
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
