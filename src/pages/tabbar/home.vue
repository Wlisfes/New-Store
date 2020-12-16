<template>
	<view class="app-container" @touchmove.stop>
		<AppScroll
			class="scroll"
			:customStyle="scroll.customStyle"
			:scroll-y="scroll.scrollY"
			:refresher-enabled="scroll.refresherEnabled"
			:lower-threshold="scroll.lowerThreshold"
			:freshing="scroll.freshing"
			:triggered="scroll.triggered"
			@refresh="scroll.onRefresh"
			@restore="scroll.onRestore"
			@tolower="scroll.onTolower"
		>
			<view>
				<u-search
					placeholder="日照香炉生紫烟"
					input-align="center"
					margin="0 30rpx 30rpx"
					:disabled="true"
					:show-action="false"
					@click="onSearch"
				></u-search>
				<view class="app-swiper">
					<u-swiper :list="banners" name="picUrl"></u-swiper>
				</view>
				<view class="classify" v-if="classify.length">
					<view class="classify-item" v-for="(k, index) in classify" :key="index">
						<u-image width="110rpx" height="110rpx" :src="k.picUrl" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<text class="classify-name">{{ k.name }}</text>
					</view>
				</view>

				<view class="hotcell">
					<u-section
						title="热销推荐"
						sub-title="查看更多"
						:font-size="32"
						color="#141f33"
						sub-color="#616b80"
					></u-section>
					<scroll-view class="hotcell-scroll" :scroll-x="true">
						<view
							class="hotcell-item"
							v-for="(k, index) in hotcell"
							:key="index"
							@click="() => navigateTo('/pages/home/product')"
						>
							<view class="hotcell-image">
								<u-image width="100%" height="100%" :src="k.product.picUrl" mode="widthFix">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view class="hotcell-name u-line-1">{{ k.product.title }}</view>
							<view class="hotcell-amount">
								<text>{{ `¥${k.product.price}` }}</text>
								<text class="amount-inverse">{{ `¥${k.product.suprice}` }}</text>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="list">
					<view class="list-title">
						<u-section title="猜你喜欢" :font-size="32" color="#141f33" :right="false"></u-section>
					</view>
					<view class="list-container">
						<view
							class="list-item"
							v-for="(k, index) in scroll.dataSource"
							:key="index"
							@click="() => navigateTo('/pages/home/product')"
						>
							<u-image
								width="300rpx"
								height="300rpx"
								src="/static/icons/1605967031503.png"
								mode="widthFix"
							>
								<u-loading slot="loading"></u-loading>
							</u-image>
							<view class="card-name u-line-1">澳洲进口红肉橙澳洲进口红肉橙澳洲进口红肉橙</view>
							<view class="card-footer">
								<view class="amount">
									<text>¥19.9</text>
									<text class="amount-inverse">¥29.9</text>
								</view>
								<u-tag text="沆瀣一气" mode="dark" bg-color="#fa3534" color="#ffffff" size="mini" />
							</view>
						</view>
					</view>
				</view>
				<view class="app-loading">
					<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
				</view>
			</view>
		</AppScroll>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { banner, source, hotwell } from '@/api/home'
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Home',
	components: {
		AppScroll
	},
	data() {
		return {
			banners: [],
			classify: [],
			hotcell: [],
			scroll: {
				dataSource: Object.keys([...Array(20)]),
				customStyle: { height: '100%' },
				scrollY: true,
				refresherEnabled: true,
				lowerThreshold: 500,
				freshing: false,
				triggered: false,
				onRefresh: async () => {
					console.log('刷新')
					this.scroll.freshing = true
					this.scroll.triggered = true
					await this.banner()
					await this.source()
					await this.hotwell()
					this.scroll.dataSource = Object.keys([...Array(20)])
					this.scroll.triggered = false
					this.scroll.freshing = false
				},
				onRestore: () => {
					console.log('刷新结束')
					this.scroll.triggered = 'restore'
				},
				onTolower: () => {
					this.scroll.dataSource.push(...Object.keys([...Array(20)]))
				}
			}
		}
	},
	computed: {
		...mapState({
			openid: state => state.openid
		})
	},
	onLoad(e) {
		this.banner()
		this.source()
		this.hotwell()
	},
	onShareAppMessage() {},
	methods: {
		//banner轮播图
		async banner() {
			const response = await banner()
			if (response.code === 200) {
				this.banners = response.data
				return response
			}
		},
		//分类列表
		async source() {
			const response = await source()
			if (response.code === 200) {
				this.classify = response.data
				return response
			}
		},
		//热销列表
		async hotwell() {
			const response = await hotwell()
			if (response.code === 200) {
				this.hotcell = response.data
				return response
			}
		},
		//路由跳转
		navigateTo(url) {
			uni.navigateTo({ url })
		},
		onSearch() {}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	height: 100vh;
	overflow: hidden;
	.app-swiper {
		margin: 0 30rpx;
		position: relative;
	}
	.scroll {
		flex: 1;
		overflow: hidden;
		.app-loading {
			text-align: center;
			padding: 32rpx;
		}
	}
}

.classify {
	display: flex;
	flex-wrap: wrap;
	margin: 36rpx 28rpx 0;
	&-item {
		width: 20%;
		padding: 0 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 36rpx;
	}
	&-name {
		font-size: 26rpx;
		color: #141f33;
		text-align: center;
		margin-top: 10rpx;
	}
}
.hotcell {
	margin: 0 30rpx;
	&-scroll {
		white-space: nowrap;
		margin: 30rpx 0;
	}
	&-item {
		display: inline-block;
		width: 240rpx;
		padding-right: 30rpx;
		&:last-child {
			width: 210rpx;
			padding-right: 0;
		}
	}
	&-image {
		width: 210rpx;
		height: 210rpx;
		background-color: #f5f7fa;
		border-radius: 8rpx;
	}
	&-name {
		font-size: 30rpx;
		color: #141f33;
		margin-top: 16rpx;
		text-align: center;
	}
	&-amount {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		font-size: 26rpx;
		color: #fa3534;
		.amount-inverse {
			font-size: 24rpx;
			color: #99a0ad;
			text-decoration: line-through;
		}
	}
}
.list {
	background-color: #ffffff;
	&-title {
		padding: 0 30rpx 30rpx;
	}
	&-container {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx 30rpx;
		background-color: #f5f7fa;
	}
	&-item {
		width: 330rpx;
		margin: 30rpx 15rpx 0;
		background-color: #ffffff;
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		padding: 15rpx 15rpx 0;
		box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.08);
		.card-name {
			font-size: 30rpx;
			color: #141f33;
			margin-top: 15rpx;
		}
		.card-footer {
			height: 48rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #fa3534;
			margin-bottom: 20rpx;
		}
		.amount {
			flex: 1;
			display: flex;
			align-items: center;
		}
		.amount-inverse {
			font-size: 24rpx;
			color: #99a0ad;
			text-decoration: line-through;
		}
	}
}
</style>
