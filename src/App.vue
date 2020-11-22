<script>
export default {
	onLaunch() {
		console.log('App Launch')
	},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
page {
	min-height: 100%;
	display: flex;
	flex-direction: column;
}
.app-container {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
