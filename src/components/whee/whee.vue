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
						v-for="(item, index) in swipe.dataSource"
						:key="index"
						:options="swipe.options"
						@open="swipe.onOpen"
						@click="swipe.onClick"
					>
						<view class="list-item">
							<u-checkbox v-model="item.checked" shape="circle" active-color="#fa3534"></u-checkbox>
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
									<view class="coin-num u-line-1">¥29.9</view>
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
					</u-swipe-action>
				</view>
			</view>
		</AppScroll>
		<view class="footer" @touchmove.stop>
			<u-checkbox v-model="swipe.checked" shape="circle" active-color="#fa3534">
				<text style="font-size: 26rpx;">全选</text>
			</u-checkbox>
			<view class="footer-whole">
				<text>合计:¥59.98</text>
			</view>
			<u-button
				shape="circle"
				size="medium"
				:hair-line="false"
				type="error"
				:custom-style="{ padding: '0 40rpx', height: '60rpx' }"
			>
				<text>去结算(0)</text>
			</u-button>
		</view>
	</view>
</template>

<script>
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Whee',
	components: {
		AppScroll
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
				checked: false,
				dataSource: Object.keys([...Array(10)]).map(i => ({
					id: i,
					title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
					show: false,
					checked: false
				})),
				options: [
					{ text: '收藏', style: { backgroundColor: '#007aff' } },
					{ text: '删除', style: { backgroundColor: '#dd524d' } }
				],
				onOpen: index => {
					this.swipe.dataSource[index].show = true
					this.swipe.dataSource.map((val, idx) => {
						if (index != idx) {
							this.swipe.dataSource[idx].show = false
						}
					})
				},
				onClick(index) {
					const text = this.swipe.options[index].text
					this.$u.toast(text)
				}
			}
		}
	},
	methods: {}
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
