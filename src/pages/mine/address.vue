<template>
	<view class="app-container">
		<view v-if="dataSource.length === 0" class="address-empty">
			<u-empty text="暂无收货地址" color="#616b80" mode="address"></u-empty>
			<u-button
				type="warning"
				class="submit"
				size="medium"
				shape="circle"
				@click="() => navigateTo('/pages/mine/addresstoc')"
			>
				<text>添加新地址</text>
			</u-button>
		</view>
		<view v-else class="scroll" @touchmove.stop>
			<AppScroll
				class="scroll-container"
				:customStyle="scroll.customStyle"
				:scroll-y="scroll.scrollY"
				:refresher-enabled="scroll.refresherEnabled"
				:freshing="scroll.freshing"
				:triggered="scroll.triggered"
				@refresh="scroll.onRefresh"
				@restore="scroll.onRestore"
			>
				<view class="list">
					<view class="list-item" v-for="(props, index) in scroll.dataSource" :key="index">
						<view class="header">
							<view class="name">李先森</view>
							<view class="mobile u-line-1">18645672361</view>
						</view>
						<view class="content u-line-2">
							湖北省武汉市武昌区XX路XX小区XX栋XX单元湖北省武汉市武昌区XX路XX小区XX栋XX单元湖北省武汉市武昌区XX路XX小区XX栋XX单元
						</view>
						<view class="footer u-border-top">
							<u-icon label="编辑" size="32" name="/static/icons/1606634152715.png"></u-icon>
							<u-icon
								label="删除"
								size="32"
								:custom-style="{ marginLeft: '48rpx' }"
								name="/static/icons/1606634179501.png"
							></u-icon>
						</view>
					</view>
				</view>
			</AppScroll>
			<view class="scroll-submit" @touchmove.stop>
				<u-button
					type="warning"
					shape="circle"
					size="medium"
					:custom-style="{ width: '100%' }"
					@click="() => navigateTo('/pages/mine/addresstoc')"
				>
					<text>添加新地址</text>
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Address',
	components: {
		AppScroll
	},
	data() {
		return {
			scroll: {
				dataSource: Object.keys([...Array(3)]),
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
.app-container {
	height: 100vh;
	overflow: hidden;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.address-empty {
	flex: 1;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 180rpx;
	.submit {
		margin-top: 20rpx;
	}
}
.scroll {
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	&-container {
		flex: 1;
		overflow: hidden;
		background-color: #f5f7fa;
	}
	&-submit {
		padding: 30rpx;
	}
}
.list {
	padding: 0 30rpx 30rpx;
	overflow: hidden;
	&-item {
		border-radius: 16rpx;
		background-color: #ffffff;
		padding: 0 30rpx;
		margin-top: 30rpx;
		overflow: hidden;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
	}
	.header {
		height: 44rpx;
		margin: 20rpx 0 10rpx;
		display: flex;
		align-items: center;
		font-size: 32rpx;
		color: #141f33;
		font-weight: 500;
		.mobile {
			margin-left: 30rpx;
		}
	}
	.content {
		height: 80rpx;
		margin-bottom: 14rpx;
		color: #616b80;
		font-size: 28rpx;
	}
	.footer {
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
