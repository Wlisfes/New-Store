<template>
	<view class="app-coupon">
		<view class="app-coupon-item" v-for="(item, index) in dataSource" :key="index">
			<view class="line" :style="{ backgroundColor: lineColor }"></view>
			<view class="book">
				<view class="book-amount">{{ `¥${item.discount / 100 || '0.00'}` }}</view>
				<view class="book-desc">{{ `满${item.satisfy / 100 || '0.00'}可用` }}</view>
			</view>
			<view class="content">
				<view class="name u-line-1">{{ `${item.source.name}专享卷` }}</view>
				<view class="desc u-line-2">
					<text>{{ item.desc }}</text>
				</view>
				<view class="u-line-1">{{ item.startTime | time | date }}~{{ item.endTime | time | date }}</view>
			</view>
			<view class="status">
				<u-icon v-if="status === 1" name="/static/icons/1606660143377.png" size="100"></u-icon>
				<u-icon v-if="status === 2" name="/static/icons/1606660154639.png" size="100"></u-icon>
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
				label="暂无相关优惠劵"
				label-color="#99a0ad"
				label-pos="bottom"
				size="200"
				name="/static/icons/1606631372969.png"
			></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppCoupon',
	props: {
		lineColor: {
			type: String,
			default: '#FF5A47'
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		status: {
			type: Number,
			default: 0
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
	filters: {
		time(val) {
			return new Date(val).getTime()
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss">
.app-coupon {
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
		height: 180rpx;
		display: flex;
		margin-top: 30rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 14rpx 2rpx rgba(0, 0, 0, 0.2);
		&:last-child {
			margin-bottom: 30rpx;
		}
		.line {
			width: 10rpx;
			height: 100%;
		}
		.book {
			width: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			&-amount {
				color: #fa3534;
				font-size: 48rpx;
			}
			&-desc {
				color: #141f33;
				font-size: 26rpx;
			}
		}
		.status {
			width: 112rpx;
			padding-top: 12rpx;
		}
		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-right: 12rpx;
			font-size: 24rpx;
			color: #99a0ad;
			.name {
				font-size: 32rpx;
				color: #141f33;
				font-weight: 500;
			}
			.desc {
				height: 64rpx;
				line-height: 32rpx;
				margin: 4rpx 0;
			}
		}
	}
}
</style>
