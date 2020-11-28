<template>
	<view class="app-container">
		<u-search
			placeholder="日照香炉生紫烟"
			input-align="center"
			margin="0 30rpx 30rpx"
			:disabled="true"
			:show-action="false"
			@click="onSearch"
		></u-search>
		<u-swiper class="app-swiper" :list="banners" name="imageUrl"></u-swiper>
		<view class="classify">
			<view class="classify-item" v-for="(k, index) in classify" :key="index">
				<u-image width="110rpx" height="110rpx" :src="k.picUrl" mode="widthFix">
					<u-loading slot="loading"></u-loading>
				</u-image>
				<text class="classify-name">水果水果</text>
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
				<view class="hotcell-item" v-for="(k, index) in 10" :key="index">
					<view class="hotcell-image">
						<u-image width="100%" height="100%" src="/static/icons/1605967031503.png" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view>
					<view class="hotcell-name u-line-1">澳洲进口红肉橙</view>
					<view class="hotcell-amount">
						<text>￥19.9</text>
						<text class="amount-inverse">￥29.9</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="list">
			<u-section title="猜你喜欢" :font-size="32" color="#141f33" :right="false"></u-section>
			<!-- <u-waterfall ref="uWaterfall" v-model="list">
				<template v-slot:left="{ leftList }">
					<view v-for="(item, index) in leftList" :key="index">
						{{ index }}
						<u-image
							width="300rpx"
							height="300rpx"
							src="/static/icons/1605967031503.png"
							mode="widthFix"
							:lazy-load="index > 9"
						></u-image>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view v-for="(item, index) in rightList" :key="index">
						{{ index }}
						<u-image
							width="300rpx"
							height="300rpx"
							src="/static/icons/1605967031503.png"
							mode="widthFix"
							:lazy-load="index > 9"
						></u-image>
					</view>
				</template>
			</u-waterfall> -->
			<view class="list-container">
				<view v-for="(item, index) in list" :key="index">
					<u-image width="300rpx" height="300rpx" src="/static/icons/1605967031503.png" mode="widthFix">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex'
import { banner } from '@/api/common'
export default {
	name: 'Home',
	data() {
		return {
			banners: [],
			classify: [
				{ id: 1, name: '水果', picUrl: '/static/icons/1605951261225.png' },
				{ id: 2, name: '蔬菜', picUrl: '/static/icons/1605960766279.png' },
				{ id: 3, name: '家禽', picUrl: '/static/icons/1605960791822.png' },
				{ id: 4, name: '家畜', picUrl: '/static/icons/1605960804484.png' },
				{ id: 5, name: '水产', picUrl: '/static/icons/1605960827823.png' },
				{ id: 6, name: '蛋类', picUrl: '/static/icons/1605960843547.png' },
				{ id: 7, name: '卤制品', picUrl: '/static/icons/1605960853385.png' },
				{ id: 8, name: '饮品', picUrl: '/static/icons/1605960866246.png' },
				{ id: 9, name: '粮油', picUrl: '/static/icons/1605960878178.png' },
				{ id: 10, name: '熟食烘培', picUrl: '/static/icons/1605960888670.png' }
			],
			list: Object.keys([...Array(20)])
		}
	},
	computed: {
		...mapState({
			openid: state => state.openid
		})
	},
	created() {
		console.log('created')
		this.banner()
	},
	onLoad(e) {
		console.log('onLoad')
	},
	onReachBottom() {
		this.list.push(...Object.keys([...Array(20)]))
		console.log('onReachBottom')
	},
	//下拉刷新
	async onPullDownRefresh() {
		await this.banner()
		// this.$refs.uWaterfall.clear()
		this.list = Object.keys([...Array(20)])
		uni.stopPullDownRefresh()
	},
	methods: {
		async banner() {
			const response = await banner({ type: 'iphone' })
			console.log(response)
			if (response.code === 200) {
				this.banners = response.banners
			}
		},
		onSearch() {}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	// background-color: #F5F7FA;
	.app-swiper {
		margin: 0 30rpx;
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
	padding: 0 30rpx;
	background-color: #f5f7fa;
	&-container {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
