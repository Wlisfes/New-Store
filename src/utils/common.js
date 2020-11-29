export const options = {
	success: response => {},
	fail: error => {},
	complete: () => {}
}

//打开权限设置界面
export function openSetting(params = options) {
	uni.openSetting(params)
}
