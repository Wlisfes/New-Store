<template>
	<view class="app-container">
		<view class="source-header" @touchmove.stop>
			<u-search
				placeholder="日照香炉生紫烟"
				input-align="center"
				margin="0 30rpx 30rpx"
				:disabled="true"
				:show-action="false"
			></u-search>
			<u-tabs
				class="nav-tabs"
				:list="form.navs"
				:current="form.current"
				:show-bar="false"
				:height="56"
				:font-size="28"
				:bold="false"
				:bar-height="0"
				active-color="#ffffff"
				:active-item-style="{ backgroundColor: '#ffb41f' }"
				@change="index => (form.current = index)"
			></u-tabs>
			<view class="nav-sort">
				<text class="sort-name" :class="{ active: form.sort === 1 }" @click="form.onSort(1)">综合</text>
				<text class="sort-name" :class="{ active: form.sort === 2 }" @click="form.onSort(2)">销量</text>
				<text class="sort-name" :class="{ active: form.sort === 3 }" @click="form.onSort(3)">价格</text>
			</view>
		</view>
		<view class="scroll">
			<AppScroll
				class="scroll-context"
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
				<view class="scroll-container">
					<view
						class="scroll-item"
						v-for="(k, index) in scroll.dataSource"
						:key="index"
						@click="() => navigateTo('/pages/home/product')"
					>
						<u-image width="300rpx" height="300rpx" src="/static/icons/1605967031503.png" mode="widthFix">
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
				<view class="app-loading">
					<u-loading mode="circle" size="48" color="#ffb41f">加载中</u-loading>
				</view>
			</AppScroll>
		</view>
	</view>
</template>

<script>
import { source } from '@/api/home'
import AppScroll from '@/components/common/scroll'
export default {
	name: 'Source',
	components: {
		AppScroll
	},
	data() {
		return {
			form: {
				current: 0,
				sort: 1,
				navs: [],
				onSort: sort => {
					this.form.sort = sort
				}
			},
			scroll: {
				dataSource: Object.keys([...Array(20)]),
				customStyle: { height: '100%' },
				scrollY: true,
				refresherEnabled: true,
				lowerThreshold: 500,
				freshing: false,
				triggered: false,
				onRefresh: () => {
					console.log('刷新')
					this.scroll.freshing = true
					this.scroll.triggered = true
					setTimeout(() => {
						this.scroll.dataSource = Object.keys([...Array(20)])
						this.scroll.triggered = false
						this.scroll.freshing = false
					}, 500)
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
	onLoad() {
		this.source()
	},
	methods: {
		//分类列表
		async source() {
			const response = await source()
			if (response.code === 200) {
				this.form.navs = response.data
				return response
			}
		},
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
	.app-loading {
		text-align: center;
		padding: 32rpx;
	}
}
.source-header {
	display: flex;
	flex-direction: column;
	.nav-tabs {
		margin: 0 24rpx;
		/deep/ .u-tab-item {
			background-color: #f0f2f5;
			margin-right: 24rpx;
			border-radius: 8rpx;
			color: #141f33;
		}
	}
	.nav-sort {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
		color: #141f33;
		line-height: 80rpx;
		padding: 0 12rpx;
		.sort-name {
			padding: 0 24rpx;
			transition: all 300ms;
			&.active {
				color: #ffb41f;
			}
		}
	}
}
.scroll {
	flex: 1;
	overflow: hidden;
	background-color: #f5f7fa;
	&-context {
		height: 100%;
		overflow: hidden;
	}
	&-container {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx;
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
