<template>
	<view class="app-container">
		<u-form ref="form" :model="form" :rules="rules" :error-type="['toast']" label-width="130">
			<u-form-item label="收货人" prop="name">
				<u-input v-model="form.name" :clearable="false" placeholder="请输入收货人姓名" />
			</u-form-item>
			<u-form-item label="手机号" prop="mobile">
				<u-input
					v-model="form.mobile"
					:clearable="false"
					:maxlength="11"
					type="number"
					placeholder="请输入手机号码"
				/>
			</u-form-item>
			<u-form-item label="所在地区" prop="region">
				<u-input
					v-model="form.region"
					disabled
					:clearable="false"
					placeholder="请选择所在地区"
					@click="picker.onClick"
				/>
				<button slot="right" class="u-reset-button form-item-button" size="mini" @click="chooseLocation">
					<u-icon size="48" name="/static/icons/1606642163080.png"></u-icon>
				</button>
			</u-form-item>
			<u-form-item label-position="left / top" label="详细地址">
				<u-input v-model="form.address" :clearable="false" type="textarea" placeholder="请输入详细地址" />
			</u-form-item>
			<u-form-item label="设为默认地址" :border-bottom="false" label-width="200" prop="address">
				<u-switch v-model="form.checked" size="40" active-color="#19be6b" slot="right"></u-switch>
			</u-form-item>
		</u-form>
		<view class="footer">
			<u-button type="warning" plain shape="circle" hover-class="none" @click="chooseAddress">
				<text>一键获取微信地址</text>
			</u-button>
			<u-button type="warning" shape="circle" :custom-style="{ marginTop: '30rpx' }" @click="onSubmit">
				<text>保存</text>
			</u-button>
		</view>
		<u-picker
			mode="region"
			v-model="picker.show"
			safe-area-inset-bottom
			:defaultRegion="picker.region"
			@confirm="picker.onConfirm"
		></u-picker>
	</view>
</template>

<script>
import { openSetting } from '@/utils/common'
export default {
	name: 'AddressToc',
	data() {
		return {
			form: {
				name: '妖雨纯',
				mobile: '19926422517',
				address: null,
				region: '广东省、深圳市、龙岗区',
				checked: false
			},
			rules: {
				name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
				mobile: [
					{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
					{
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value)
						},
						message: '手机号格式不正确',
						trigger: ['change', 'blur']
					}
				],
				region: [{ required: true, message: '请选择所在地区', trigger: 'blur' }],
				address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
			},
			picker: {
				show: false,
				region: [],
				onClick: () => {
					if (this.form.region) {
						this.picker.region = this.form.region.split('、')
					}
					this.picker.show = true
				},
				onConfirm: props => {
					const { province, city, area } = props
					this.picker.region = [province.label, city.label, area.label]
					this.form.region = `${province.label}、${city.label}、${area.label}`
				}
			}
		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		//保存
		onSubmit() {
			this.$refs.form.validate(async valid => {
				console.log(valid)
			})
		},
		//调取微信内置地区api
		chooseLocation() {
			uni.chooseLocation({
				success: response => {
					console.log(response)
				},
				fail: error => {
					console.log(error)
					if (error.errMsg !== 'chooseAddress:fail cancel') {
						uni.showModal({
							content: '地理位置未授权，请授权后再使用',
							confirmText: '去授权',
							success: res => {
								res.confirm && openSetting()
							}
						})
					}
				}
			})
		},
		//授权微信地址
		chooseAddress() {
			uni.chooseAddress({
				success: response => {
					const { errMsg, userName, telNumber, provinceName, cityName, countyName, detailInfo } = response
					if (errMsg === 'chooseAddress:ok') {
						this.form.name = userName
						this.form.mobile = telNumber
						this.form.region = `${provinceName}、${cityName}、${countyName}`
						this.form.address = detailInfo
					}
				},
				fail: error => {
					console.log(error)
					if (error.errMsg !== 'chooseAddress:fail cancel') {
						uni.showModal({
							content: '地址获取未授权，请授权后再使用',
							confirmText: '去授权',
							success: res => {
								res.confirm && openSetting()
							}
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	padding: 0 30rpx;
	overflow: hidden;
	.form-item-button {
		display: flex;
		align-items: center;
		padding: 20rpx;
		margin-right: -20rpx;
	}
	.footer {
		overflow: hidden;
		margin: 80rpx 0 30rpx;
	}
}
</style>
