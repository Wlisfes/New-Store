<template>
	<view class="app-container">
		<u-form class="app-form" ref="form" :model="form" :rules="rules" :error-type="['toast']">
			<u-form-item prop="opinion">
				<u-input
					v-model="form.opinion"
					:clearable="false"
					type="textarea"
					:auto-height="false"
					placeholder="请写下您留言"
					:height="480"
					:maxlength="200"
					:custom-style="{ fontSize: '30rpx', color: '#141f33', lineHeight: 1.5 }"
				></u-input>
			</u-form-item>
		</u-form>
		<view class="submit">
			<u-button type="warning" shape="circle" @click="onSubmit">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'CommonLeave',
	data() {
		return {
			form: {
				opinion: null
			},
			rules: {
				opinion: [
					{ required: true, message: '请填写反馈意见', trigger: 'blur' },
					{ min: 10, message: '反馈意见不能少于10个字', trigger: ['blur', 'change'] }
				]
			}
		}
	},
	onReady() {
		this.$refs.form.setRules(this.rules)
	},
	methods: {
		//提交
		onSubmit() {
			console.log(111)
			this.$refs.form.validate(async valid => {
				console.log(valid)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background-color: #f5f7fa;
	overflow: hidden;
	.app-form {
		margin: 30rpx;
		padding: 0 30rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		overflow: hidden;
		&-input {
			font-size: 26rpx;
			color: #141f33;
			line-height: 1.5;
		}
	}
	.submit {
		flex: 1;
		margin: 0 30rpx 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
}
</style>
