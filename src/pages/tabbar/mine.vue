<template>
	<view class="app-container">
		<view class="user">
			<u-avatar
				class="user-avatar"
				:src="user.avatar || '/static/icons/1607182291897.jpg'"
				:size="108"
			></u-avatar>
			<view class="user-name">
				<text v-if="user.nickname">妖雨纯</text>
				<button v-else class="u-reset-button login" open-type="getUserInfo" @getuserinfo="AuthUser">
					<text>未登录</text>
				</button>
			</view>
		</view>
		<view class="keep">
			<view class="keep-item" @click="() => navigateTo('/pages/mine/wallet')">
				<view class="keep-number" style="color: #fa3534">20</view>
				<view class="keep-name">钱包(元)</view>
			</view>
			<view class="keep-item" @click="() => navigateTo('/pages/mine/coupon')">
				<view class="keep-number">3</view>
				<view class="keep-name">优惠券(张)</view>
			</view>
			<view class="keep-item" @click="() => navigateTo('/pages/mine/favorite')">
				<view class="keep-number">12</view>
				<view class="keep-name">我的收藏</view>
			</view>
		</view>
		<view class="order">
			<view class="order-title">
				<u-section
					title="我的订单"
					sub-title="查看全部"
					:font-size="32"
					:show-line="false"
					color="#141f33"
				></u-section>
			</view>
			<view class="order-conster">
				<view class="conster-item">
					<view class="relative">
						<u-badge type="error" count="2" size="mini" :offset="[-8, -8]"> </u-badge>
						<u-image width="80rpx" height="80rpx" src="/static/icons/1606580159010.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<text>待付款</text>
				</view>
				<view class="conster-item">
					<view class="relative">
						<u-badge type="error" count="1" size="mini" :offset="[-8, -8]"> </u-badge>
						<u-image width="80rpx" height="80rpx" src="/static/icons/1606580177237.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<text>待发货</text>
				</view>
				<view class="conster-item">
					<view class="relative">
						<u-badge type="error" count="12" size="mini" :offset="[-8, -8]"> </u-badge>
						<u-image width="80rpx" height="80rpx" src="/static/icons/1606580187289.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<text>待收货</text>
				</view>
				<view class="conster-item">
					<view class="relative">
						<u-badge type="error" count="4" size="mini" :offset="[-8, -8]"> </u-badge>
						<u-image width="80rpx" height="80rpx" src="/static/icons/1606580200743.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<text>已完成</text>
				</view>
			</view>
		</view>
		<view class="site">
			<u-cell-group :border="false">
				<u-cell-item
					icon="map"
					hover-class="none"
					:border-bottom="false"
					title="收货地址"
					@click="() => navigateTo('/pages/mine/address')"
				></u-cell-item>
				<button class="site-contact" hover-class="none" open-type="contact">
					<u-cell-item icon="kefu-ermai" :border-bottom="false" title="联系客服"></u-cell-item>
				</button>
				<u-cell-item
					icon="chat"
					:border-bottom="false"
					hover-class="none"
					title="意见反馈"
					@click="() => navigateTo('/pages/mine/feedback')"
				></u-cell-item>
				<u-cell-item icon="setting" :border-bottom="false" hover-class="none" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'Mine',
	data() {
		return {
			src: 'https://oss.lisfes.cn/avatar/1592580988216.jpg?x-oss-process=style/resize'
		}
	},
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	onLoad() {
		console.log(this.user)
	},
	//下拉刷新
	async onPullDownRefresh() {
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 500)
	},
	methods: {
		//路由跳转
		navigateTo(url) {
			uni.navigateTo({ url })
		},
		AuthUser(e) {
			const { errMsg, userInfo } = e.detail
			if (errMsg === 'getUserInfo:ok') {
				this.$store.dispatch('user/AuthUser', userInfo)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background: linear-gradient(#ffb41f 0%, #ffb41f 270rpx, #f5f7fa 270rpx);
	overflow: hidden;
}
.user {
	display: flex;
	align-items: center;
	padding: 40rpx 30rpx;
	&-avatar {
		display: flex;
		align-items: center;
	}
	&-name {
		flex: 1;
		margin-left: 24rpx;
		font-size: 40rpx;
		color: #ffffff;
		.login {
			display: inline-block;
		}
	}
}
.keep {
	margin: 0 30rpx;
	height: 164rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	display: flex;
	align-items: center;
	&-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		.keep-number {
			font-size: 36rpx;
			color: #ff9900;
			font-weight: 400;
		}
		.keep-name {
			color: #616b80;
			font-size: 26rpx;
			margin-top: 4rpx;
		}
	}
}
.order {
	margin: 30rpx;
	padding: 0 30rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	&-title {
		height: 44rpx;
		margin: 24rpx 0;
	}
	&-conster {
		display: flex;
		margin-bottom: 30rpx;
		.conster-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #616b80;
			font-size: 26rpx;
		}
		.relative {
			width: 80rpx;
			height: 80rpx;
			position: relative;
		}
	}
}
.site {
	margin: 0 30rpx 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
	&-contact {
		padding: 0;
		background-color: transparent;
		&::after {
			border: none;
		}
	}
}
</style>
