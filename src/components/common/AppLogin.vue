<template>
	<view class="app-login">
		<view class="is-login">
			<u-avatar src="/static/icons/1607182291897.jpg" :size="188"></u-avatar>
			<view class="is-login-text">未登录</view>
			<u-button type="success" size="medium" shape="circle" open-type="getUserInfo" @getuserinfo="AuthUser">
				<text :style="{ fontSize: '32rpx', color: '#ffffff' }">授权登录</text>
			</u-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'AppLogin',
	methods: {
		//授权登录
		async AuthUser(e) {
			const { errMsg, userInfo } = e.detail
			if (errMsg === 'getUserInfo:ok') {
				await this.$store.dispatch('user/AuthUser', {
					avatar: userInfo.avatarUrl,
					nickname: userInfo.nickName
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-login {
	.is-login {
		display: flex;
		flex-direction: column;
		padding: 60rpx 30rpx;
		align-items: center;
		&-text {
			font-size: 32rpx;
			color: #141f33;
			margin: 20rpx 0 60rpx;
		}
	}
}
</style>
