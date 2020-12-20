<template>
	<view class="app-container">
		<view class="container">
			<view class="banner">
				<swiper class="banner-swiper" indicator-dots>
					<swiper-item v-for="(src, index) in product.banner" :key="index">
						<u-image width="100%" height="100%" :src="src" mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</swiper-item>
				</swiper>
				<view class="banner-footer">
					<view class="context">
						<view class="context-title u-line-2">
							<text>{{ product.title }}</text>
						</view>
						<view class="context-sub">
							<text class="amount">{{ `¥${product.price / 100 || '0.00'}` }}</text>
							<text class="amount-inverse">{{ `¥${product.suprice / 100 || '0.00'}` }}</text>
							<text class="month-sales">{{ `月销: ${product.sales}` }}</text>
						</view>
					</view>
				</view>
			</view>
			<u-gap height="30" bg-color="#f5f7fa"></u-gap>
			<view class="content">
				<view class="content-title">
					<u-section title="商品详情" :font-size="32" color="#141f33" :right="false"></u-section>
				</view>
				<view class="content-image">
					<u-image v-for="(src, index) in product.content" :key="index" :src="src" mode="widthFix">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
			</view>
		</view>
		<view class="app-footer">
			<AppFooter></AppFooter>
		</view>
	</view>
</template>

<script>
import { productInfo } from '@/api/common'
import AppFooter from '@/components/common/footer'
export default {
	name: 'Product',
	components: {
		AppFooter
	},
	data() {
		return {
			product: {
				banner: [],
				content: [],
				title: '',
				price: 0,
				suprice: 0,
				sales: 0
			}
		}
	},
	onLoad() {
		this.productInfo()
	},
	//下拉刷新
	async onPullDownRefresh() {
		await this.productInfo()
		uni.stopPullDownRefresh()
	},
	methods: {
		//商品详情
		async productInfo() {
			const { id } = this.useOptions()
			const response = await productInfo({ id })
			const { code, data } = response
			if (code === 200) {
				this.product.banner = data.banner
				this.product.content = data.content
				this.product.title = data.title
				this.product.price = data.price
				this.product.suprice = data.suprice
				this.product.sales = data.sales
			}
			return response
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	padding-bottom: 140rpx;
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: constant(safe-area-inset-bottomm);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.app-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		padding-bottom: constant(safe-area-inset-bottomm);
		padding-bottom: env(safe-area-inset-bottom);
	}
}
.banner {
	background-color: #ffffff;
	&-swiper {
		height: 750rpx;
	}
	&-footer {
		padding: 20rpx 30rpx;
		display: flex;
		.star {
			width: 140rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #99a0ad;
		}
	}
	.context {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		&-title {
			font-size: 36rpx;
			color: #141f33;
			font-weight: 500;
		}
		&-sub {
			display: flex;
			align-items: baseline;
			margin: 10rpx 0;
		}
		.amount {
			font-size: 36rpx;
			color: #fa3534;
			font-weight: 500;
		}
		.amount-inverse {
			font-size: 28rpx;
			color: #99a0ad;
			text-decoration: line-through;
			margin-left: 4rpx;
		}
		.month-sales {
			font-size: 28rpx;
			color: #99a0ad;
			margin-left: 40rpx;
		}
	}
}
.content {
	&-title {
		margin: 30rpx;
	}
	&-image {
		display: flex;
		flex-direction: column;
		/deep/ image {
			width: 100%;
			display: block;
		}
	}
}
</style>
