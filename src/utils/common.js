//打开权限设置界面
export function openSetting({ success = () => {}, fail = () => {} } = {}) {
	uni.openSetting({
		success,
		fail
	})
}
