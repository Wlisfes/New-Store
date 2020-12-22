<template>
	<u-popup
		:value="visible"
		mode="bottom"
		safe-area-inset-bottom
		:closeable="true"
		border-radius="14"
		@close="onClose"
	>
		<view class="app-sku">
			<view class="conter">
				<u-image :width="140" :height="140" :src="picUrl" mode="widthFix" :border-radius="6">
					<u-loading slot="loading"></u-loading>
				</u-image>
				<view :style="{ flex: 1, margin: '0 30rpx', overflow: 'hidden' }">
					<view class="conter-title u-line-1">{{ title }}</view>
				</view>
			</view>
			<view class="format">
				<block v-for="(item, index) in initFormat" :key="item.id">
					<view class="format-item">
						<view class="format-item-title">{{ item.name }}</view>
						<view class="format-item-attr">
							<block v-for="attr in item.attr" :key="attr.attrId">
								<button
									class="u-reset-button attr-tags"
									:class="{ 'attr-active': item.active === attr.attrId }"
									@click="() => onClick(attr.attrId, index)"
								>
									<text>{{ attr.name }}</text>
								</button>
							</block>
						</view>
					</view>
				</block>
			</view>
			<view class="number">
				<text>数量</text>
				<u-number-box
					v-model="some"
					disabled-input
					:input-width="64"
					:input-height="44"
					hover-class="none"
				></u-number-box>
			</view>
			<view class="submit">
				<u-button type="warning" shape="circle" @click="onSubmit">确定</u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
export default {
	name: 'AppSku',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		picUrl: {
			type: String,
			default: ''
		},
		sku: {
			type: Array,
			default: () => []
		},
		format: {
			type: Array,
			default: () => []
		},
		sumber: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			some: 1,
			active: 0,
			initFormat: []
		}
	},
	computed: {
		skukey() {
			const format = this.initFormat.filter(k => !!k.active).map(k => k.active)
			return this.sku.filter(k => format.some(v => k.skukey.indexOf(v) !== -1))
		}
	},
	watch: {
		format: {
			handler(current) {
				current.length && this.init(current)
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		init(format) {
			this.initFormat = format.map(k => ({
				...k,
				attr: k.attr.map(v => ({
					...v
					// sku: this.sku.filter(t => t.skukey.indexOf(v.attrId) !== -1)
				})),
				active: ''
			}))
		},
		filter(attrId) {
			const sku = this.skukey.find(k => k.skukey.indexOf(attrId) !== -1)
			console.log(sku)
		},
		onClose() {
			this.$emit('update:visible', false)
		},
		onSubmit() {
			const every = this.initFormat.every(k => !!k.active)
			if (!every) {
				uni.showToast({ title: '请选择规格', icon: 'none' })
			} else {
				const skukey = this.initFormat.map(k => k.active).join('-')
				this.$emit('submit', {
					skukey,
					some: this.some,
					sumber: this.sumber
				})
			}
		},
		onClick(attrId, formatIndex) {
			const active = this.initFormat[formatIndex].active
			if (active === attrId) {
				this.initFormat[formatIndex].active = ''
				// this.initFormat.forEach((k, ki) => {
				// 	k.attr.forEach((v, vi) => {
				// 		this.initFormat[ki].attr[vi].stock = ''
				// 	})
				// })
			} else {
				this.initFormat[formatIndex].active = attrId
			}

			const every = this.initFormat.every(k => !!k.active)
			if (every) {
				console.log('选择完毕，suk:', this.initFormat.map(k => k.active).join('-'))
			} else {
				const format = this.initFormat.filter(k => !!k.active).map(k => k.active)
				const sku = this.sku.filter(k => format.some(v => k.skukey.indexOf(v) !== -1))

				console.log(sku)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-sku {
	overflow: hidden;
	background-color: #ffffff;
	.conter {
		display: flex;
		margin: 30rpx 30rpx 50rpx;
		overflow: hidden;
		&-title {
			font-size: 30rpx;
			color: #141f33;
			font-weight: 500;
		}
	}
	.format {
		margin: 0 15rpx;
		&-item {
			overflow: hidden;
			&-title {
				font-size: 30rpx;
				color: #616b80;
				margin: 0 15rpx;
				margin-bottom: 30rpx;
			}
			&-attr {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 20rpx;
			}
			.attr-tags {
				width: 210rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				background-color: #f0f2f5;
				color: #616b80;
				border-radius: 6rpx;
				margin-bottom: 30rpx;
				&.attr-active {
					background-color: #ff9900;
					color: #ffffff;
				}
			}
		}
	}
	.number {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 30rpx 50rpx;
	}
	.submit {
		margin: 0 30rpx 20rpx;
	}
}
</style>
