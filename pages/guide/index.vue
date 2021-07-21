<template>
	<view>
		<view class="menu-box">
			<view class="menu-item" @click="navTo('/pages/loadRefresh/index')">loadRefresh 上滑加载下拉刷新</view>
			<view class="menu-item" @click="navTo('/pages/loadRefresh/tabs')">tabs + swiper 全屏选项卡</view>
			<view class="menu-item" @click="navTo('/pages/sofarPicker/index')">sofarPicker 年-月 范围组件</view>
			<view class="menu-item" @click="navTo('/pages/termPicker/index')">termPicker 年-月-日 范围组件</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.menu-box {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.menu-item {
		width: 100%;
		height: 100rpx;
		color: #666666;
		display: flex;
		align-items: center;
		margin-top: 2rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
	}
	.menu-item:active {
		background-color: #fafdff;
	}
</style>
