<template>
	<view class="app-container">
		<view class="app-coupon">
			<view
				class="app-coupon-item"
				:class="{ active: item.active && item.reducr }"
				v-for="item in scroll.dataSource"
				:key="item.id"
				@click="onClick(item)"
			>
				<view class="line"></view>
				<view class="book">
					<view class="book-amount">{{ `¥${item.discount / 100 || '0.00'}` }}</view>
					<view class="book-desc">{{ `满${item.satisfy / 100}可用` }}</view>
				</view>
				<view class="content">
					<view class="name u-line-1">{{ `${item.source.name}专享卷` }}</view>
					<view class="desc u-line-2">
						<text>{{ item.desc }}</text>
					</view>
					<view class="u-line-1">{{ item.startTime | time | date }}~{{ item.endTime | time | date }}</view>
				</view>
				<view class="status">
					<u-icon v-if="coupon.id == item.id" name="checkbox-mark" :size="48" color="#fa3534"></u-icon>
				</view>
				<block v-if="!item.active">
					<view class="desc-footer">
						<text>不可用原因:</text>
						<text :style="{ color: '#99a0ad', marginLeft: '10rpx' }">
							{{ `仅限于${item.source.name}商品使用` }}
						</text>
					</view>
				</block>
				<block v-else-if="!item.reducr">
					<view class="desc-footer">
						<text>不可用原因:</text>
						<text :style="{ color: '#99a0ad', marginLeft: '10rpx' }">未满足最低金额</text>
					</view>
				</block>
			</view>
			<view class="app-loading" v-if="isMore">
				<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
			</view>
			<view class="app-loading" v-if="isEmpty">
				<u-divider bg-color="rgba(0,0,0,0)">没有更多了</u-divider>
			</view>
		</view>
		<view class="app-loading" v-if="isLoading">
			<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
		</view>

		<view class="app-under">
			<view class="app-under-container">
				<view class="whole">
					<text :style="{ color: '#141f33', marginRight: '10rpx' }">优惠金额: </text>
					<text>¥{{ coupon.discount / 100 || '0.00' }}</text>
				</view>
				<u-button
					shape="circle"
					size="medium"
					:hair-line="false"
					type="error"
					:custom-style="{ padding: '0 40rpx', height: '68rpx' }"
					@click="onSubmit"
				>
					<text>确认</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { userCoupon } from '@/api/coupon'
export default {
	name: 'CommonCoupon',
	data() {
		return {
			coupon: {
				id: 0,
				ids: [],
				total: 0,
				discount: 0
			},
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
		...mapState({
			uid: state => state.user.uid
		}),
		isLoading() {
			return this.scroll.total === 0 && this.scroll.loading
		},
		isEmpty() {
			return this.scroll.total === this.scroll.offset && !this.scroll.loading
		},
		isMore() {
			return this.scroll.offset < this.scroll.total
		}
	},
	filters: {
		time(val) {
			return new Date(val).getTime()
		}
	},
	onLoad(options) {
		this.coupon.ids = options.ids.split(',')
		this.coupon.total = options.total
		this.coupon.id = options.id
		this.userCoupon()
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
		//转换数据格式
		transformCoupon(dataSource = []) {
			const { total, ids } = this.coupon
			return dataSource.map(k => {
				const active = ids.every(v => v == k.source.id) //查看分类id是否完全一致
				console.log(active)
				return {
					...k,
					reducr: total >= k.satisfy,
					active: active
				}
			})
		},
		//我的优惠劵
		async userCoupon(concat) {
			const { offset, limit, dataSource } = this.scroll
			const response = await userCoupon({ status: 1, offset, limit })
			const { code, data } = response
			if (code === 200) {
				if (concat) {
					this.scroll.offset = offset + data.list.length
					this.scroll.dataSource = dataSource.concat(this.transformCoupon(data.list))
				} else {
					this.scroll.offset = data.list.length
					this.scroll.dataSource = this.transformCoupon(data.list)
				}
				this.scroll.total = data.total
				this.scroll.loading = false
			}
			return response
		},
		//选择优惠劵
		onClick(props) {
			if (props.reducr && props.active) {
				const reset = this.coupon.id === props.id
				if (reset) {
					this.coupon.id = 0
					this.coupon.discount = 0
				} else {
					this.coupon.id = props.id
					this.coupon.discount = props.discount
				}
			}
		},
		//确定
		onSubmit() {
			uni.$emit('under-coupon', { ...this.coupon })
			uni.navigateBack({ delta: 1 })
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #f5f7fa;
	.app-loading {
		text-align: center;
		padding: 32rpx;
	}
}
.app-coupon {
	padding: 0 20rpx 100rpx;
	overflow: hidden;
	&-item {
		height: 240rpx;
		display: flex;
		margin-top: 30rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background-color: #ffffff;
		position: relative;
		padding-left: 10rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.15);
		padding-bottom: 60rpx;
		&:last-child {
			margin-bottom: 30rpx;
		}
		&.active {
			height: 180rpx;
			padding-bottom: 0;
			.line {
				background-color: #ff5a47;
			}
			.book {
				&-amount {
					color: #fa3534;
				}
				&-desc {
					color: #141f33;
				}
			}
			.content {
				.name {
					color: #141f33;
				}
			}
		}
		.line {
			width: 10rpx;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			background-color: #99a0ad;
		}
		.book {
			width: 180rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			&-amount {
				color: #99a0ad;
				font-size: 48rpx;
			}
			&-desc {
				color: #99a0ad;
				font-size: 26rpx;
			}
		}
		.status {
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
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
				color: #99a0ad;
				font-weight: 500;
			}
			.desc {
				height: 64rpx;
				line-height: 32rpx;
				margin: 4rpx 0;
			}
		}
		.desc-footer {
			font-size: 24rpx;
			display: flex;
			align-items: center;
			color: #fa3534;
			position: absolute;
			height: 40rpx;
			left: 30rpx;
			right: 30rpx;
			bottom: 20rpx;
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
