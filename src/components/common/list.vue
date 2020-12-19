<template>
	<view class="list">
		<view class="title">
			<u-divider bg-color="rgba(0,0,0,0)" :half-width="60" color="#fa3534" border-color="#fa3534" :font-size="32">
				<text>{{ title }}</text>
			</u-divider>
		</view>
		<view class="container" v-if="dataSource.length">
			<view class="list-item" v-for="item in dataSource" :key="item.id">
				<view class="content" @click="() => onClick(item)">
					<view :style="{ margin: '0 auto' }">
						<u-image width="315rpx" height="315rpx" :src="item.picUrl" mode="widthFix" :border-radius="6">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<view class="card-name u-line-1">{{ item.title }}</view>
					<view class="coupon">
						<view class="sales">{{ `已销 ${item.sales} 笔` }}</view>
						<block v-for="(coupon, index) in item.coupon" :key="coupon.id">
							<u-tag
								v-if="index < 1"
								:text="`满${coupon.satisfy / 100}减${coupon.discount / 100}`"
								style="margin: 0 4rpx;"
								mode="light"
								shape="circle"
								size="mini"
								type="error"
							/>
						</block>
					</view>
					<view class="card-footer">
						<view class="amount">
							<text :style="{ fontWeight: 500 }">{{ `¥${item.price / 100 || '0.00'}` }}</text>
							<text class="amount-inverse">{{ `¥${item.suprice / 100 || '0.00'}` }}</text>
						</view>
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
			<u-empty :text="empty" mode="favor"></u-empty>
		</view>
		<view class="app-loading" v-if="isLoading">
			<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppList',
	props: {
		title: {
			type: String,
			default: '猜你喜欢'
		},
		empty: {
			type: String,
			default: '暂无数据'
		},
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
		//首次加载动画
		isLoading() {
			return this.total === 0 && this.loading
		},
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
		onClick({ id }) {
			this.$emit('click', id)
		}
	}
}
</script>

<style lang="scss" scoped>
.list {
	overflow: hidden;
	.app-loading {
		text-align: center;
		padding: 48rpx;
	}
	.title {
		margin-top: 30rpx;
	}
	.container {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10rpx 30rpx;
		background-color: #f5f7fa;
	}
	&-item {
		width: 50%;
		padding: 30rpx 10rpx 0;
	}
	.content {
		width: 100%;
		background-color: #ffffff;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		padding: 15rpx 15rpx 0;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
		.card-name {
			font-size: 30rpx;
			color: #141f33;
			margin-top: 15rpx;
		}
		.coupon {
			display: flex;
			align-items: center;
			.sales {
				font-size: 20rpx;
				color: #99a0ad;
				margin-right: 10rpx;
			}
		}
		.card-footer {
			height: 48rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #fa3534;
			margin-bottom: 20rpx;
		}
		.amount {
			flex: 1;
			display: flex;
			align-items: center;
		}
		.amount-inverse {
			font-size: 24rpx;
			color: #99a0ad;
			text-decoration: line-through;
			margin-left: 12rpx;
		}
	}
}
</style>
