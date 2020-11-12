<template>
	<view class="content" :style="{'--color': color, '--playState': playState}">
		<view v-if="type === 'hollowDots'" class="refresh hollow-dots-spinner">
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
		</view>
		<view v-if="type === 'halfCircle'" class="refresh half-circle-spinner">
			<view class="circle circle-1"></view>
			<view class="circle circle-2"></view>
		</view>
		<view v-if="type === 'swappingSquares'" class="refresh swapping-squares-spinner">
			<view class="square"></view>
			<view class="square"></view>
			<view class="square"></view>
			<view class="square"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'animation',
		props: {
			type: {
				type: String,
				default: 'hollowDots'
			},
			color: {
				type: String,
				default: '#04C4C4'
			},
			playState: {
				type: String,
				default: 'paused'
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	$color: var(--color);
	$playState: var(--playState);
	
	.refresh {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		view {
			animation-play-state: $playState!important;
		}
	}
	
	/* HollowDots  */
	.hollow-dots-spinner .dot {
	  width: 30rpx;
	  height: 30rpx;
	  margin: 0 calc(30rpx / 2);
	  border: calc(30rpx / 5) solid $color;
	  border-radius: 50%;
	  float: left;
	  transform: scale(0);
	  animation: hollowDots 1000ms ease infinite 0ms;
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
	@keyframes hollowDots {
	  50% {
		transform: scale(1);
		opacity: 1;
	  }
	  100% {
		opacity: 0;
	  }
	}
	
	/* halfCircle  */
	.half-circle-spinner .circle {
	  content: "";
	  position: absolute;
	  width: 60rpx;
	  height: 60rpx;
	  border-radius: 100%;
	  border: calc(60rpx / 10) solid transparent;
	}

	.half-circle-spinner .circle.circle-1 {
	  border-top-color: $color;
	  animation: halfCircle 1s infinite;
	}
	.half-circle-spinner .circle.circle-2 {
	  border-bottom-color: $color;
	  animation: halfCircle 1s infinite alternate;
	}
	@keyframes halfCircle {
	  0% {
		transform: rotate(0deg);
	  }
	  100%{
		transform: rotate(360deg);
	  }
	}
	
	/* swappingSquares */
	.swapping-squares-spinner {
	  position: relative;
	}
	.swapping-squares-spinner .square {
	  height: calc(65rpx * 0.25 / 1.3);
	  width:  calc(65rpx * 0.25 / 1.3);
	  animation-duration: 1000ms;
	  border: calc(65rpx * 0.04 / 1.3) solid $color;
	  margin-right: auto;
	  margin-left: auto;
	  position: absolute;
	  animation-iteration-count: infinite;
	}
	.swapping-squares-spinner .square:nth-child(1) {
	  animation-name: swappingSquares-child-1;
	  animation-delay: 500ms;
	}
	.swapping-squares-spinner .square:nth-child(2) {
	  animation-name: swappingSquares-child-2;
	  animation-delay: 0ms;
	}
	.swapping-squares-spinner .square:nth-child(3) {
	  animation-name: swappingSquares-child-3;
	  animation-delay: 500ms;
	}
	.swapping-squares-spinner .square:nth-child(4) {
	  animation-name: swappingSquares-child-4;
	  animation-delay: 0ms;
	}
	@keyframes swappingSquares-child-1 {
	  50% {
		transform: translate(150%,150%) scale(2,2);
	  }
	}
	@keyframes swappingSquares-child-2 {
	  50% {
		transform: translate(-150%,150%) scale(2,2);
	  }
	}
	@keyframes swappingSquares-child-3 {
	  50% {
		transform: translate(-150%,-150%) scale(2,2);
	  }
	}
	@keyframes swappingSquares-child-4 {
	  50% {
		transform: translate(150%,-150%) scale(2,2);
	  }
	}
</style>