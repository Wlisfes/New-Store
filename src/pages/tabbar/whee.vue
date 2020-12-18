<template>
	<view class="app-container">
		<view class="list">
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
						<view class="list-item-content" @click="() => navigateTo('/pages/home/product')">
							<u-image
								width="200rpx"
								height="200rpx"
								src="/static/icons/1605967031503.png"
								mode="widthFix"
							></u-image>
							<view class="list-content">
								<view class="title u-line-2">{{ item.product.title }}</view>
								<view class="format">
									<text class="u-line-1">规格：</text>
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
				:custom-style="{ padding: '0 40rpx', height: '60rpx' }"
			>
				<text>去结算</text>
			</u-button>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'Whee',
	data() {
		return {
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
					this.$store.commit('whee/onClick', { ...proos, index })
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
			},
			immediate: true
		}
	},
	//下拉刷新
	async onPullDownRefresh() {
		if (this.uid) {
			await this.$store.dispatch('whee/list')
		}
		uni.stopPullDownRefresh()
	},
	methods: {}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #f5f7fa;
	.footer {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		&-whole {
			flex: 1;
			font-size: 28rpx;
			color: #fa3534;
		}
	}
}
.list {
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	margin: 0 30rpx 100rpx;
	transform: translate3d(0, 0, 0);
	&-item {
		width: 690rpx;
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
