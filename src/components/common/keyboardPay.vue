<template>
	<u-keyboard
		ref="uKeyboard"
		v-model="visible"
		mode="number"
		:mask="true"
		:mask-close-able="false"
		:dot-enabled="false"
		:safe-area-inset-bottom="true"
		:tooltip="false"
		@change="onChange"
		@backspace="onBackspace"
	>
		<view>
			<view class="u-text-center u-padding-20 money">
				<text>{{ (total / 100).toFixed(2) || '0.00' }}</text>
				<text class="u-font-20 u-padding-left-10">元</text>
				<view class="u-padding-10 close" @click="onClose">
					<u-icon name="close" color="#333333" size="28"></u-icon>
				</view>
			</view>
			<view class="u-flex u-row-center" :style="{ marginBottom: '30rpx' }">
				<u-message-input
					mode="box"
					:maxlength="6"
					:dot-fill="true"
					v-model="password"
					:disabled-keyboard="true"
				></u-message-input>
			</view>
		</view>
	</u-keyboard>
</template>

<script>
import { payOrder } from '@/api/order'
export default {
	name: 'AppKeyboardPay',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		total: {
			type: Number,
			default: 0
		},
		order: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			password: ''
		}
	},
	methods: {
		onChange(val) {
			if (this.password.length < 6) {
				this.password += val
			}
			if (this.password.length >= 6) {
				this.onSubmit()
			}
		},
		onBackspace(e) {
			if (this.password.length > 0) {
				this.password = this.password.substring(0, this.password.length - 1)
			}
		},
		//关闭
		onClose() {
			this.password = ''
			this.$emit('close')
		},
		async onSubmit() {
			uni.showLoading({ title: '加载中...' })
			const response = await payOrder({
				order: this.order,
				password: this.password
			})
			if (response.code === 200) {
				uni.hideLoading()
				this.password = ''
				this.$emit('submit')
			} else {
				this.password = ''
				uni.showToast({ title: response.message, icon: 'none' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.money {
	font-size: 80rpx;
	color: #fa3534;
	position: relative;
	.close {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		line-height: 28rpx;
		font-size: 28rpx;
	}
}
</style>
