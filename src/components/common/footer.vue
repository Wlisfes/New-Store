<template>
	<view class="app-footer u-border-top">
		<view class="app-item u-border-bottom u-border-right">
			<button class="u-reset-button" open-type="contact">
				<u-icon name="server-fill" :size="38" color="#616b80"></u-icon>
				<view class="text u-line-1">客服</view>
			</button>
		</view>
		<view class="app-item u-border-bottom u-border-right">
			<block v-if="uid">
				<view class="app-item-box" @click="() => onClick(2)">
					<u-badge :count="dataSource.length" type="error" size="mini" :offset="[5, 2]"></u-badge>
					<u-icon name="shopping-cart" :size="38" color="#616b80"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</block>
			<block v-else>
				<button class="u-reset-button" open-type="getUserInfo" @getuserinfo="e => AuthUser(e, 2)">
					<u-badge :count="dataSource.length" type="error" size="mini" :offset="[5, 2]"></u-badge>
					<u-icon name="shopping-cart" :size="38" color="#616b80"></u-icon>
					<view class="text u-line-1">购物车</view>
				</button>
			</block>
		</view>
		<view class="app-item u-border-bottom u-border-right">
			<block v-if="uid">
				<view class="app-item-box" @click="() => onClick(3)">
					<u-icon name="star" :size="38" color="#616b80"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
			</block>
			<block v-else>
				<button class="u-reset-button" open-type="getUserInfo" @getuserinfo="e => AuthUser(e, 3)">
					<u-icon name="star" :size="38" color="#616b80"></u-icon>
					<view class="text u-line-1">收藏</view>
				</button>
			</block>
		</view>
		<view class="app-button u-border-bottom" :style="{ paddingLeft: '20rpx' }">
			<block v-if="uid">
				<button
					class="u-reset-button sub-bottom"
					:style="{ backgroundColor: app.error }"
					@click="() => onClick(4)"
				>
					<text>加入购物车</text>
				</button>
			</block>
			<block v-else>
				<button
					class="u-reset-button sub-bottom"
					:style="{ backgroundColor: app.error }"
					open-type="getUserInfo"
					@getuserinfo="e => AuthUser(e, 4)"
				>
					<text>加入购物车</text>
				</button>
			</block>
		</view>
		<view class="app-button u-border-bottom" :style="{ paddingRight: '20rpx' }">
			<block v-if="uid">
				<button
					class="u-reset-button sub-bottom"
					:style="{ backgroundColor: app.warning }"
					@click="() => onClick(5)"
				>
					<text>立即购买</text>
				</button>
			</block>
			<block v-else>
				<button
					class="u-reset-button sub-bottom"
					:style="{ backgroundColor: app.warning }"
					open-type="getUserInfo"
					@getuserinfo="e => AuthUser(e, 5)"
				>
					<text>立即购买</text>
				</button>
			</block>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'AppFooter',
	data() {
		return {
			app: {
				warning: '#ff9900',
				error: '#fa3534'
			}
		}
	},
	computed: {
		...mapState({
			uid: state => state.user.uid,
			dataSource: state => state.whee.list
		})
	},
	methods: {
		//授权登录
		async AuthUser(e, sumber) {
			const { errMsg, userInfo } = e.detail
			if (errMsg === 'getUserInfo:ok') {
				const response = await this.$store.dispatch('user/AuthUser', {
					avatar: userInfo.avatarUrl,
					nickname: userInfo.nickName
				})
				if (response.code === 200) {
					this.$emit('click', sumber)
				}
			}
		},
		onClick(sumber) {
			this.$emit('click', sumber)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-footer {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	position: relative;
	.app-button {
		flex: 1;
		height: 100rpx;
		display: flex;
		align-items: center;
		padding: 0 8rpx;
		.sub-bottom {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			font-size: 28rpx;
			color: #ffffff;
		}
	}
	.app-item {
		width: 110rpx;
		height: 100rpx;
		position: relative;
		font-size: 20rpx;
		color: #141f33;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		&-box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.u-reset-button {
			margin: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
