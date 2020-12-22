<template>
	<view class="app-container">
		<!-- <view class="amount">{{ balance.toLocaleString() }}</view> -->
		<view class="sku">
			<view class="list" style="width: 400px; margin: 100px auto">
				<view class="item" v-for="(item, index) in specsList" :key="index">
					<view class="label">{{ item.name }}</view>
					<view class="specs-list">
						<view
							:class="[
								'specs',
								active.some(id => id === specs.id) ? 'active' : '',
								specs.disabled ? 'disabled' : ''
							]"
							v-for="specs in item.list"
							:key="specs.id"
							@click="specs.disabled ? null : handleChange(specs.id, index)"
						>
							{{ specs.id }}
						</view>
					</view>
				</view>
			</view>
			<view style="width: 400px; margin: 0 auto">
				<view>{{ activeSkuKey }}</view>
				<view>{{ Object.keys(result) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
var SKUResult = {}
var data = {
	'1;4;7': { price: 366.0, stock: 46 },
	'1;4;8': { price: 366.0, stock: 46 },
	'1;4;9': { price: 366.0, stock: 46 },
	'1;5;9': { price: 366.0, stock: 46 },
	'2;4;7': { price: 366.0, stock: 46 },
	'3;4;7': { price: 366.0, stock: 46 },
	'1;5;7': { price: 366.0, stock: 46 },
	'1;6;9': { price: 366.0, stock: 46 },
	'1;6;8': { price: 366.0, stock: 46 }
}
export default {
	name: 'Wallet',
	data() {
		return {
			balance: '1000.00',
			active: [],
			sku: {},
			result: data,

			specsList: [
				{
					name: '型号',
					list: [
						{
							name: 'iphone 6',
							id: '1',
							disabled: false
						},
						{
							name: 'iphone 7',
							id: '2',
							disabled: false
						},
						{
							name: 'iphone 8',
							id: '3',
							disabled: false
						}
					]
				},
				{
					name: '颜色',
					list: [
						{
							name: '黑色',
							id: '4',
							disabled: false
						},
						{
							name: '银色',
							id: '5',
							disabled: false
						},
						{
							name: '灰色',
							id: '6',
							disabled: false
						}
					]
				},
				{
					name: '内存',
					list: [
						{
							name: '32G',
							id: '7',
							disabled: false
						},
						{
							name: '64G',
							id: '8',
							disabled: false
						},
						{
							name: '124G',
							id: '9',
							disabled: false
						}
					]
				}
			]
		}
	},
	computed: {
		activeSkuKey() {
			let key = []
			this.active.forEach(item => {
				if (item) {
					key.push(item)
				}
			})
			return key.sort().join(';')
		}
	},
	created() {
		// this.initSKU();
		this.init()
	},
	methods: {
		handleChange(currentId, currentIndex) {
			let specsIds = this.specsList.map(item => {
				return item.list.map(specs => {
					return specs.id
				})
			})
			let index = this.active.indexOf(currentId)
			if (index < 0) {
				this.active.push(currentId)
			} else {
				this.active.splice(index, 1)
			}
			this.active.forEach((item, index) => {
				if (specsIds[currentIndex].indexOf(item) >= 0 && item !== currentId) {
					this.active.splice(index, 1)
				}
			})
			this.$nextTick(() => {
				let activeLength = this.active.length
				specsIds.forEach((specsWrap, specsWrapIndex) => {
					let flag = -1
					this.active.forEach((activeId, activeIndex) => {
						if (specsWrap.indexOf(activeId) >= 0) {
							flag = activeIndex
						}
					})
					specsWrap.forEach((speacsId, specsIndex) => {
						let testSpecsIds = []
						if (!activeLength) {
							testSpecsIds.push(speacsId)
						} else {
							let active = Object.assign([], this.active)
							if (flag >= 0) {
								active.splice(flag, 1)
								active.push(speacsId)
								testSpecsIds = active
							} else {
								active.push(speacsId)
								testSpecsIds = active
							}
						}
						testSpecsIds.sort()
						let value = this.sku[testSpecsIds.join(';')]
						this.$set(this.specsList[specsWrapIndex].list[specsIndex], 'disabled', !value)
					})
				})
			})
		},
		init() {
			let keys = Object.keys(data)
			let value = keys.map(item => {
				return data[item]
			})
			let sku = {}
			keys.forEach(item => {
				let value = data[item]
				let keys = this.combination(item)
				keys.forEach(idsWrap => {
					idsWrap.forEach(ids => {
						ids.sort((value1, value2) => {
							return parseInt(value1) - parseInt(value2)
						})
						let key = ids.join(';')
						if (!sku[key]) {
							sku[key] = {
								stock: value.stock,
								prices: [value.price]
							}
						} else {
							sku[key].stock += value.stock
							sku[key].prices.push(value.price)
						}
					})
				})
			})
			this.sku = sku
			this.initSpecs(sku)
		},
		combination(str) {
			var arr = str.split(';')
			for (var a2 = []; a2.push([]) < arr.length; );
			var I = Math.pow(2, arr.length) - 1
			for (var i = 1; i <= I; i++) {
				var s2 = i
					.toString(2)
					.split('')
					.reverse()
				var t = [],
					m = -1
				for (var k = 0; k < s2.length; k++) {
					if (s2[k] == '1') {
						t.push(arr[k])
						m++
					}
				}
				a2[m].push(t)
			}
			return a2
		},
		initSpecs(sku) {
			this.specsList.forEach((item, wrapperIndex) => {
				item.list.forEach((specs, specsIndex) => {
					if (!sku[specs.id]) {
						this.$set(this.specsList[wrapperIndex].list[specsIndex], 'disabled', true)
					}
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	background: linear-gradient(#ff5a47 0%, #ff5a47 200rpx, #f5f7fa 200rpx);
	overflow: hidden;
	.amount {
		height: 200rpx;
		color: #ffffff;
		font-size: 64rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 20rpx;
	}
}
.specs-list {
	display: flex;
}
.specs {
	font-size: 14px;
	color: #666;
	border: 1px solid #999;
	padding: 2px 10px;
	border-radius: 5px;
	cursor: pointer;
	&.active {
		color: #409eff;
		border-color: #409eff;
	}
	&.disabled {
		color: #eee;
		border-color: #eee;
	}
	// & + {
	// 	margin-right: 10px;
	// }
}
</style>
