<template>
	<view class="refresh-animation">
		<view class="hollow-dots-spinner">
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
			<view class="dot" :style="[{animationPlayState: playState}]"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.refresh-animation {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	/* HollowDotsSpinner  */
	.hollow-dots-spinner, .hollow-dots-spinner * {
	  box-sizing: border-box;
	}
	.hollow-dots-spinner {
	  height: 100rpx;
	  width: 100%;
	}
	.hollow-dots-spinner .dot {
	  width: 15px;
	  height: 15px;
	  margin: 0 calc(15px / 2);
	  border: calc(15px / 5) solid #04C4C4;
	  border-radius: 50%;
	  float: left;
	  transform: scale(0);
	  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
	}
	.hollow-dots-spinner .dot:nth-child(1) {
	  animation-delay: calc(300ms * 1);
	}
	.hollow-dots-spinner .dot:nth-child(2) {
	  animation-delay: calc(300ms * 2);
	}
	.hollow-dots-spinner .dot:nth-child(3) {
	  animation-delay: calc(300ms * 3);
	
	}
	@keyframes hollow-dots-spinner-animation {
	  50% {
		transform: scale(1);
		opacity: 1;
	  }
	  100% {
		opacity: 0;
	  }
	}
	
</style>