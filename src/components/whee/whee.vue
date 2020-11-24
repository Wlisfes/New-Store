<template>
	<view class="app-whee">
		<!-- <view class="header" @touchmove.stop></view> -->
		<scroll-view
			class="scroll"
			scroll-y
			refresher-enabled
			:lower-threshold="500"
			:refresher-triggered="triggered"
			@refresherrefresh="onRefresh"
			@refresherrestore="onRestore"
		>
			<view class="list">
				<u-swipe-action
					:show="item.show"
					:index="index"
					btn-width="150"
					v-for="(item, index) in list"
					:key="index"
					:options="options"
					@open="onOpen"
					@click="onClick"
				>
					<view class="list-item">
						<u-checkbox v-model="item.checked" shape="circle" active-color="#ffb41f"></u-checkbox>
						<u-image
							width="200rpx"
							height="200rpx"
							src="/static/icons/1605967031503.png"
							mode="widthFix"
						></u-image>
						<view class="list-content">
							<text class="title u-line-2">{{ item.title }}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</scroll-view>
		<view class="footer" @touchmove.stop></view>
	</view>
</template>

<script>
export default {
	name: 'Whee',
	data() {
		return {
			list: Object.keys([...Array(20)]).map(i => ({
				id: i,
				title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
				show: false,
				checked: true
			})),
			options: [
				{ text: '收藏', style: { backgroundColor: '#007aff' } },
				{ text: '删除', style: { backgroundColor: '#dd524d' } }
			],
			triggered: 'restore'
		}
	},
	onLoad() {
		this._freshing = false
	},
	methods: {
		onRestore() {
			this.triggered = 'restore'
			console.log('需要重置')
		},
		onRefresh() {
			if (this._freshing) return
			this._freshing = true
			console.log('下拉刷新触发')
			setTimeout(() => {
				this.triggered = false
				this._freshing = false
				console.log('下拉刷新结束')
			}, 1500)
		},
		onOpen(index) {
			this.list[index].show = true
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false
			})
		},
		onClick(index) {
			console.log(index)
			const text = this.options[index].text
			this.$u.toast(text)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-whee {
	display: flex;
	flex-direction: column;
	.header,
	.footer {
		height: 100rpx;
	}
	.scroll {
		flex: 1;
		overflow: hidden;
		background-color: #f5f7fa;
	}
}
.list {
	margin: 30rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	&-item {
		display: flex;
		padding: 20rpx;
		align-items: center;
	}
	&-content {
		height: 200rpx;
		margin-left: 16rpx;
	}
}
</style>
