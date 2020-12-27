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
			<AppFooter @click="onClick"></AppFooter>
		</view>
		<AppSku
			:visible.sync="sku.visible"
			:title="product.title"
			:picUrl="product.picUrl"
			:sku="product.sku"
			:format="product.format"
			:sumber="sku.sumber"
			@submit="onSubmit"
		></AppSku>
		<u-back-top :scroll-top="product.scrollTop"></u-back-top>
	</view>
</template>

<script>
import { productInfo } from '@/api/common'
import { createWhee, createCacheWhee } from '@/api/whee'
import AppFooter from '@/components/common/AppFooter'
import AppSku from '@/components/common/AppSku'
export default {
	name: 'Product',
	components: {
		AppFooter,
		AppSku
	},
	data() {
		return {
			product: {
				banner: [],
				content: [],
				sku: [],
				format: [],
				star: null,
				title: '',
				picUrl: '',
				price: 0,
				suprice: 0,
				sales: 0,
				scrollTop: 0
			},
			sku: {
				visible: false,
				sumber: 0,
				onClick: () => {
					this.sku.visible = true
				}
			}
		}
	},
	onLoad() {
		this.productInfo()
	},
	//滚动事件
	onPageScroll(e) {
		this.product.scrollTop = e.scrollTop
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
				this.product.sku = data.sku
				this.product.format = data.format
				this.product.star = data.star
				this.product.title = data.title
				this.product.picUrl = data.picUrl
				this.product.price = data.price
				this.product.suprice = data.suprice
				this.product.sales = data.sales
			}
			return response
		},
		//底部菜单点击事件
		onClick(sumber) {
			if ([4, 5].includes(sumber)) {
				this.sku.sumber = sumber
				this.sku.visible = true
			}
		},
		//suk组件确定事件
		async onSubmit(ops) {
			const { sumber, sku, some } = ops
			const { id } = this.useOptions()
			uni.showLoading({ title: '加载中...' })
			if (sumber === 4) {
				//加入购物车
				const { code, data, message } = await createWhee({ id, some, sku: sku.id })
				if (code === 200) {
					uni.showToast({
						title: data,
						success: () => {
							this.sku.visible = false
						}
					})
				} else {
					uni.showToast({ title: message, icon: 'none' })
				}
			} else if (sumber === 5) {
				//立即购买
				const { code, data, message } = await createCacheWhee({ id, some, sku: sku.id })
				if (code === 200) {
					uni.hideLoading()
					this.sku.visible = false
					this.navigateTo(`/pages/common/under?ids=${data.id}`)
				} else {
					uni.showToast({ title: message, icon: 'none' })
				}
			}
			//刷新购物车
			await this.$store.dispatch('whee/list')
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
