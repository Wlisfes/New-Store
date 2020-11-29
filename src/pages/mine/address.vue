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
			<scroll-view
				class="scroll-container"
				scroll-y
				refresher-enabled
				:refresher-triggered="triggered"
				@refresherrefresh="onRefresh"
				@refresherrestore="onRestore"
			>
				<view class="list">
					<view class="list-item" v-for="(props, index) in dataSource" :key="index">
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
			</scroll-view>
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
export default {
	name: 'Address',
	data() {
		return {
			dataSource: [1, 2, 3],
			triggered: 'restore'
		}
	},
	onLoad() {
		this._freshing = false
	},
	methods: {
		//路由跳转
		navigateTo(url) {
			uni.navigateTo({ url })
		},
		onRestore() {
			this.triggered = 'restore'
			console.log('需要重置')
		},
		onRefresh() {
			if (this._freshing) return
			this._freshing = true
			console.log('下拉刷新触发')
			setTimeout(() => {
				this.triggered = false
				this._freshing = false
				console.log('下拉刷新结束')
			}, 500)
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
