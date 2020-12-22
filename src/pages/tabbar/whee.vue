<template>
	<view class="app-container">
		<block v-if="uid">
			<view class="list" v-if="dataSource.length">
				<view class="list-item" v-for="(item, index) in dataSource" :key="index">
					<u-swipe-action
						:show="item.show"
						:index="index"
						btn-width="150"
						:options="swipe.options"
						@open="swipe.onOpen"
						@click="swipe.onClick"
					>
						<view class="list-item-box">
							<u-checkbox
								:value="item.checked"
								name="item"
								shape="circle"
								active-color="#fa3534"
								@change="props => swipe.onChange(props, index)"
							></u-checkbox>
							<view
								class="list-item-content"
								@click="() => navigateTo(`/pages/common/product?id=${item.product.id}`)"
							>
								<u-image
									width="200rpx"
									height="200rpx"
									mode="widthFix"
									:src="item.product.picUrl"
									:border-radius="6"
								>
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="list-content">
									<view class="title u-line-2">{{ item.product.title }}</view>
									<view class="format">
										<text class="u-line-1">规格：{{ item.sku.skuname }}</text>
									</view>
									<view class="coin">
										<view class="coin-num u-line-1">¥{{ item.sku.price / 100 || '0.00' }}</view>
										<u-number-box
											class="coin-number"
											:value="item.some"
											disabled-input
											:input-width="64"
											:input-height="44"
										></u-number-box>
									</view>
								</view>
							</view>
						</view>
					</u-swipe-action>
				</view>
			</view>
			<view class="whee-empty" v-else>
				<u-empty mode="car" text="购物车空空如也" :icon-size="188">
					<view slot="bottom">
						<u-button
							:custom-style="emptyStyle"
							type="warning"
							hover-class="none"
							size="medium"
							shape="circle"
							plain
							@click="() => navigateTo('/pages/mine/favorite')"
						>
							热销推荐
						</u-button>
						<u-button
							:custom-style="emptyStyle"
							type="success"
							hover-class="none"
							size="medium"
							shape="circle"
							plain
							@click="() => navigateTo('/pages/mine/favorite')"
						>
							看看收藏
						</u-button>
					</view>
				</u-empty>
			</view>
			<view class="footer" @touchmove.stop>
				<u-checkbox
					:value="checked"
					name="active"
					shape="circle"
					active-color="#fa3534"
					@change="props => swipe.onChange(props)"
				>
					<text style="font-size: 26rpx;">全选</text>
				</u-checkbox>
				<view class="footer-whole">
					<text>合计:¥{{ amount / 100 || '0.00' }}</text>
				</view>
				<u-button
					shape="circle"
					size="medium"
					:hair-line="false"
					type="error"
					:custom-style="{ padding: '0 48rpx', height: '68rpx' }"
					@click="onSubmit"
				>
					<text>去结算</text>
				</u-button>
			</view>
		</block>
		<block v-else>
			<AppLogin></AppLogin>
		</block>
		<view :style="{ paddingBottom: uid ? '100rpx' : '0rpx' }">
			<AppList
				:dataSource="scroll.dataSource"
				:total="scroll.total"
				:offset="scroll.offset"
				:loading="scroll.loading"
				@click="id => navigateTo(`/pages/common/product?id=${id}`)"
			></AppList>
		</view>

		<u-back-top :scroll-top="scroll.scrollTop"></u-back-top>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { productLove } from '@/api/common'
import AppLogin from '@/components/common/login'
import AppList from '@/components/common/list'
export default {
	name: 'Whee',
	components: {
		AppLogin,
		AppList
	},
	data() {
		return {
			emptyStyle: {
				margin: '20rpx',
				padding: '0 40rpx'
			},
			scroll: {
				dataSource: [],
				total: 0,
				offset: 0,
				limit: 10,
				loading: true,
				scrollTop: 0
			},
			swipe: {
				options: [
					{ text: '收藏', key: 'star', style: { backgroundColor: '#007aff' } },
					{ text: '删除', key: 'delete', style: { backgroundColor: '#dd524d' } }
				],
				onOpen: index => {
					this.$store.commit('whee/onSwipe', { index })
				},
				onClick: (index, idx) => {
					const proos = this.swipe.options[idx]
					this.$store.dispatch('whee/onClick', { ...proos, index })
				},
				onChange: (props, index) => {
					this.$store.commit('whee/onChange', { ...props, index })
				}
			}
		}
	},
	computed: {
		...mapState({
			user: state => state.user,
			uid: state => state.user.uid,
			dataSource: state => state.whee.list
		}),
		...mapGetters({
			checked: 'whee/checked',
			amount: 'whee/amount',
			total: 'whee/total'
		})
	},
	watch: {
		uid: {
			handler(uid) {
				if (uid) {
					this.$store.dispatch('whee/list')
				}
				this.productLove()
			},
			immediate: true
		}
	},
	//滚动事件
	onPageScroll(e) {
		this.scroll.scrollTop = e.scrollTop
	},
	//下拉刷新
	async onPullDownRefresh() {
		if (this.uid) {
			await this.$store.dispatch('whee/list')
		}
		uni.stopPullDownRefresh()
	},
	//上拉加载
	async onReachBottom() {
		const { offset, total, dataSource, loading } = this.scroll
		if (offset < total && !loading) {
			this.scroll.loading = true
			await this.productLove()
		}
	},
	methods: {
		//猜你喜欢
		async productLove() {
			const { offset, limit, dataSource } = this.scroll
			const response = await productLove({ offset, limit })
			const { code, data } = response
			if (code === 200) {
				this.scroll.offset = offset + data.list.length
				this.scroll.dataSource = dataSource.concat(data.list)
				this.scroll.total = data.total
				this.scroll.loading = false
			}
			return response
		},
		onSubmit() {
			this.navigateTo(`/pages/common/under?ids=${JSON.stringify([1, 2, 3, 4, 5, 6])}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #f5f7fa;
	.footer {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		z-index: 99;
		&-whole {
			flex: 1;
			font-size: 28rpx;
			color: #fa3534;
		}
	}
	.whee-empty {
		margin: 60rpx 0;
	}
}
.list {
	overflow: hidden;
	display: flex;
	flex-direction: column;
	margin: 0 20rpx;
	transform: translate3d(0, 0, 0);
	&-item {
		width: 710rpx;
		overflow: hidden;
		background-color: #ffffff;
		&:first-child {
			margin-top: 30rpx;
			border-top-left-radius: 12rpx;
			border-top-right-radius: 12rpx;
		}
		&:last-child {
			margin-bottom: 30rpx;
			border-bottom-left-radius: 12rpx;
			border-bottom-right-radius: 12rpx;
		}
		&-box {
			padding: 20rpx;
			display: flex;
			align-items: center;
		}
		&-content {
			display: flex;
			align-items: center;
		}
	}
	&-content {
		width: 366rpx;
		flex: 1;
		height: 200rpx;
		margin-left: 16rpx;
		display: flex;
		flex-direction: column;
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
			&-number {
				/deep/ .u-icon-minus {
					width: 48rpx !important;
				}
			}
		}
	}
}
</style>
