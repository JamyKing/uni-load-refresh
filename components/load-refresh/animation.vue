<template>
	<view class="content" :style="{'--color': color, '--playState': playState}">
		<view v-if="type === 'hollowDots'" class="refresh hollow-dots-spinner">
			<view class="dot"></view>
			<view class="dot play-state"></view>
			<view class="dot play-state"></view>
		</view>
		<view v-if="type === 'circlesRhombuses'" class="refresh circles-to-rhombuses-spinner">
			<view class="circle"></view>
			<view class="circle"></view>
			<view class="circle"></view>
		</view>
		<view v-if="type === 'loopingRhombuses'" class="refresh looping-rhombuses-spinner">
			<view class="rhombus"></view>
			<view class="rhombus"></view>
			<view class="rhombus"></view>
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
	  width: 15px;
	  height: 15px;
	  margin: 0 calc(15px / 2);
	  border: calc(15px / 5) solid $color;
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
	
	/* circlesRhombuses  */
	.circles-to-rhombuses-spinner .circle {
	  height: 15px;
	  width: 15px;
	  margin-left: calc(15px * 1.125);
	  transform: rotate(45deg);
	  border-radius: 10%;
	  border: 3px solid $color;
	  overflow: hidden;
	  background: transparent;
	  animation: circlesRhombuses 1200ms linear infinite;
	}
	.circles-to-rhombuses-spinner .circle:nth-child(1) {
	  animation-delay: calc(150ms * 1);
	  margin-left: 0
	}
	.circles-to-rhombuses-spinner .circle:nth-child(2) {
	  animation-delay: calc(150ms * 2);
	}
	.circles-to-rhombuses-spinner .circle:nth-child(3) {
	  animation-delay: calc(150ms * 3);
	}
	@keyframes circlesRhombuses {
	  0% {
		border-radius: 10%;
	  }
	  17.5% {
		border-radius: 10%;
	  }
	  50% {
		border-radius: 100%;
	  }
	  93.5% {
		border-radius: 10%;
	  }
	  100% {
		border-radius: 10%;
	  }
	}
	@keyframes circles-to-rhombuses-background-animation {
	  50% {
		opacity: 0.4;
	  }
	}
	
	/* loopingRhombuses */
	.looping-rhombuses-spinner {
		position: relative;
	}
	.looping-rhombuses-spinner .rhombus {
	  height: 15px;
	  width: 15px;
	  background-color: $color;
	  left: 58%;
	  position: absolute;
	  margin: 0 auto;
	  border-radius: 2px;
	  transform: translateY(0) rotate(45deg) scale(0);
	  animation: loopingRhombuses 2500ms linear infinite;
	}
	.looping-rhombuses-spinner .rhombus:nth-child(1) {
	  animation-delay: calc(2500ms * 1 / -1.5);
	}
	.looping-rhombuses-spinner .rhombus:nth-child(2) {
	  animation-delay: calc(2500ms * 2 / -1.5);
	}
	.looping-rhombuses-spinner .rhombus:nth-child(3) {
	  animation-delay: calc(2500ms * 3 / -1.5);
	}
	@keyframes loopingRhombuses {
	  0% {
		transform: translateX(0) rotate(45deg) scale(0);
	  }
	  50% {
		transform: translateX(-233%) rotate(45deg) scale(1);
	  }
	  100% {
		transform: translateX(-466%) rotate(45deg) scale(0);
	  }
	}
</style>