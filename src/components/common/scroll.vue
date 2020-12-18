<template>
	<scroll-view
		class="app-scroll"
		:style="[customStyle]"
		:scroll-y="scrollY"
		:enable-back-to-top="true"
		:scroll-with-animation="true"
		:refresher-enabled="refresherEnabled"
		:lower-threshold="lowerThreshold"
		:refresher-triggered="triggered"
		@refresherrefresh="onRefresh"
		@refresherrestore="onRestore"
		@scrolltolower="onTolower"
		@scroll="onScroll"
	>
		<slot></slot>
	</scroll-view>
</template>

<script>
export default {
	name: 'AppScroll',
	props: {
		scrollY: {
			type: Boolean,
			default: false
		},
		refresherEnabled: {
			type: Boolean,
			default: false
		},
		lowerThreshold: {
			type: Number,
			default: 45
		},
		freshing: {
			type: Boolean,
			default: false
		},
		triggered: {
			type: [Boolean, String],
			default: 'restore'
		},
		customStyle: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			top: 0
		}
	},
	methods: {
		//重置事件
		onRestore() {
			this.$emit('restore', 'restore')
		},
		//下拉刷新
		onRefresh() {
			if (!this.freshing) {
				this.$emit('refresh', true)
			}
		},
		//上拉加载
		onTolower() {
			this.$emit('tolower')
		},
		//滚动事件
		onScroll(e) {
			this.top = e.detail.scrollTop
			this.$emit('scroll', e.detail)
		},
		backTop() {
			this.top = 0
		}
	}
}
</script>
