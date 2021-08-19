<template>
	<view class="load-refresh">
		<!-- 刷新动画，可自定义，占高100rpx -->
		<view class="animation" :style="{'--color': color}">
			<view v-if="!playState" class="remind">
				{{moving ? '↑ 松开释放' : '↓ 下拉刷新'}}
			</view>
			<view v-if="playState && refreshType === 'hollowDots'" class="refresh hollow-dots-spinner">
				<view class="dot"></view>
				<view class="dot"></view>
				<view class="dot"></view>
			</view>
			<view v-if="playState && refreshType === 'halfCircle'" class="refresh half-circle-spinner">
				<view class="circle circle-1"></view>
				<view class="circle circle-2"></view>
			</view>
			<view v-if="playState && refreshType === 'swappingSquares'" class="refresh swapping-squares-spinner">
				<view class="square"></view>
				<view class="square"></view>
				<view class="square"></view>
				<view class="square"></view>
			</view>
		</view>
		<!-- 数据列表块 -->
		<view
			class="cover-container"
			:style="[{
				background: backgroundCover,
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend">
			<scroll-view scroll-y class="list" :scroll-top="scrollTop" @scrolltolower="loadMore" :style="getHeight">
				<!-- 数据集插槽 -->
				<slot name="content-list"></slot>
				<!-- 上拉加载 -->
				<view class="load-more">{{loadText}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'loadRefresh',
		props: {
			isRefresh: {
				type: Boolean,
				default: true
			},
			refreshType: {
				type: String,
				default: 'hollowDots'
			},
			fixedHeight: {
				type: String,
				default: '0'
			},
			heightReduce: {
				type: String,
				default: '0'
			},
			color: {
				type: String,
				default: '#04C4C4'
			},
			backgroundCover: {
				type: String,
				default: 'white'
			},
			currentPage: {
				type: Number,
				default: 0
			},
			totalPages: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				startY: 0,
				moveY: 0,
				updating: false, // 数据更新状态（true: 更新中）
				updateType: true, // 数据更新类型（true: 下拉刷新: false: 加载更多）
				moving: false,
				scrollTop: -1,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				playState: false // 动画的状态 暂停 paused/开始 running
			}
		},
		computed: {
			// 计算组件所占屏幕高度
			getHeight() {
				// rpx = px / uni.getSystemInfoSync().windowWidth * 750
				if (Number(this.fixedHeight)) {
					return `height: ${this.fixedHeight}rpx;`
				} else {
					let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(0 + this.heightReduce)
					return `height: ${height}px;`
				}
			},
			// 判断loadText，可以根据需求自定义
			loadText() {
				const { currentPage, totalPages, updating, updateType } = this
				if (!updateType && updating) {
					return '加载中...'
				} else if (currentPage < totalPages) {
					return '上拉加载更多'
				} else {
					return '已经到底啦~'
				}
			}
		},
		methods: {
			// 根据currentPage和totalPages的值来判断 是否触发@loadMore
			loadMore() {
				const { currentPage, totalPages } = this
				if (!this.updating && currentPage < totalPages) {
					this.updating = true
					this.updateType = false
					this.$emit('loadMore')
				}
			},
			// 回弹效果
			coverTouchstart(e) {
				if (!this.isRefresh) {
					return
				}
				this.coverTransition = 'transform .1s linear'
				this.startY = e.touches[0].clientY
			},
			coverTouchmove(e) {
				if (!this.isRefresh || this.updating) {
					return
				}
				this.moveY = e.touches[0].clientY
				let moveDistance = this.moveY - this.startY
				if (moveDistance <= 50) {
					this.coverTransform = `translateY(${moveDistance}px)`
				}
				this.moving = moveDistance >= 50
			},
			coverTouchend() {
				if (!this.isRefresh || this.updating) {
					return
				}
				if (this.moving) {
					this.runRefresh()
				} else {
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
				}
			},
			runRefresh() {
				this.scrollTop = 0
				this.coverTransition = 'transform .1s linear'
				this.coverTransform = 'translateY(50px)'
				this.playState = true
				this.updating = true
				this.updateType = true
				this.$emit('refresh')
			},
			completed() {
				if (this.updateType) {
					// 下拉刷新
					this.moving = false
					this.scrollTop = -1
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
					setTimeout(() => {
						this.playState = false
					}, 300)
				}
				this.updating = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	$color: var(--color);
	
	.load-refresh{
		margin: 0;
		padding: 0;
		width: 100%;
		.cover-container{
			width: 100%;
			margin-top: -100rpx;
			.list{
				width: 100%;
				.load-more{
					font-size: 20rpx;
					text-align: center;
					color: #AAAAAA;
					padding: 16rpx;
				}
			}
		}
	}
	
	/* 动画 */
	.animation {
		width: 100%;
		height: 100rpx;
		.remind {
			width: 100%;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
		}
		.refresh {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			view {
				// animation-play-state: $playState!important;
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
	}
</style>