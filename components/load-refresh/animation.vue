<template>
	<view class="content" :style="{'--color': color, '--playState': playState}">
		<view class="refresh hollow-dots-spinner">
			<view class="dot refresh-play"></view>
			<view class="dot refresh-play"></view>
			<view class="dot refresh-play"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'animation',
		props: {
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
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.refresh-play {
		animation-play-state: $playState!important;
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
	  border: calc(15px / 5) solid $color;
	  border-radius: 50%;
	  float: left;
	  transform: scale(0);
	  animation: hollowSpinner 1000ms ease infinite 0ms;
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
	@keyframes hollowSpinner {
	  50% {
		transform: scale(1);
		opacity: 1;
	  }
	  100% {
		opacity: 0;
	  }
	}
	
</style>