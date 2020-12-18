import Vue from 'vue'

Vue.prototype.usePage = function() {
	return getCurrentPages().pop()
}

Vue.prototype.useOptions = function() {
	return getCurrentPages().pop().options
}

Vue.prototype.navigateTo = function(url) {
	uni.navigateTo({ url })
}
