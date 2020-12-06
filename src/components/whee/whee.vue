<template>
	<view class="app-whee" @touchmove.stop>
		<!-- <view class="header" @touchmove.stop></view> -->
		<AppScroll
			class="scroll"
			:customStyle="scroll.customStyle"
			:scroll-y="scroll.scrollY"
			:refresher-enabled="scroll.refresherEnabled"
			:freshing="scroll.freshing"
			:triggered="scroll.triggered"
			@refresh="scroll.onRefresh"
			@restore="scroll.onRestore"
		>
			<view class="scroll-container">
				<view class="list">
					<u-swipe-action
						:show="item.show"
						:index="index"
						btn-width="150"
						v-for="(item, index) in dataSource"
						:key="index"
						:options="swipe.options"
						@open="swipe.onOpen"
						@click="swipe.onClick"
					>
						<view class="list-item">
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
									<view class="title u-line-2">{{ item.title }}</view>
									<view class="format">
										<text class="u-line-1">规格：</text>
									</view>
									<view class="coin">
										<view class="coin-num u-line-1">¥{{ item.price / 100 || '0.00' }}</view>
										<u-number-box
											class="coin-number"
											:value="1"
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
		</AppScroll>
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
				<text>去结算({{ total }})</text>
			</u-button>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Whee',
	components: {
		AppScroll
	},
	computed: {
		...mapState({
			dataSource: state => state.whee.whee
		}),
		...mapGetters({
			checked: 'whee/checked',
			amount: 'whee/amount',
			total: 'whee/total'
		})
	},
	data() {
		return {
			scroll: {
				customStyle: { height: '100%' },
				scrollY: true,
				refresherEnabled: true,
				freshing: false,
				triggered: false,
				onRefresh: () => {
					console.log('刷新')
					this.scroll.freshing = true
					this.scroll.triggered = true
					setTimeout(() => {
						this.scroll.triggered = false
						this.scroll.freshing = false
					}, 500)
				},
				onRestore: () => {
					console.log('刷新结束')
					this.scroll.triggered = 'restore'
				}
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
					this.$store.commit('whee/onClick', { ...proos, index })
				},
				onChange: (props, index) => {
					this.$store.commit('whee/onChange', { ...props, index })
				}
			}
		}
	},
	methods: {
		//路由跳转
		navigateTo(url) {
			uni.navigateTo({ url })
		}
	}
}
</script>

<style lang="scss" scoped>
.app-whee {
	display: flex;
	flex-direction: column;
	.scroll {
		flex: 1;
		overflow: hidden;
		background-color: #f5f7fa;
		&-container {
			padding: 30rpx;
		}
	}
	.footer {
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		&-whole {
			flex: 1;
			font-size: 28rpx;
			color: #fa3534;
		}
	}
}
.list {
	border-radius: 12rpx;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	transform: translate3d(0, 0, 0);
	&-item {
		width: 690rpx;
		display: flex;
		padding: 20rpx;
		align-items: center;
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
				/deep/ .u-numberbox {
					width: 48rpx !important;
				}
			}
		}
	}
}
</style>
