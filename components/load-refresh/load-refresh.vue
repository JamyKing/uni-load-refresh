<template>
	<view class="load-refresh">
		<!-- 刷新动画，可自定义，占高100rpx -->
		<animation :type="refreshType" :color="color" :playState="playState"></animation>
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
	import animation from './animation.vue'
	export default {
		name: 'loadRefresh',
		components: {
			animation
		},
		props: {
			isRefresh: {
				type: Boolean,
				default: true
			},
			refreshType: {
				type: String,
				default: 'hollowDots'
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
			pageNo: {
				type: Number,
				default: 0
			},
			totalPageNo: {
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
				let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(0 + this.heightReduce)
				return `height: ${height}px;`
			},
			// 判断loadText，可以根据需求自定义
			loadText() {
				const { pageNo, totalPageNo, updating, updateType } = this
				if (!updateType && updating) {
					return '加载中...'
				} else if (pageNo < totalPageNo) {
					return '上拉加载更多'
				} else {
					return '已经到底啦~'
				}
			}
		},
		methods: {
			// 根据pageNo和totalPageNo的值来判断 是否触发@loadMore
			loadMore() {
				const { pageNo, totalPageNo } = this
				if (pageNo < totalPageNo) {
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
				this.moving = moveDistance >= 60
				if (moveDistance >= 60) {
					this.runRefresh()
				}
			},
			coverTouchend() {
				// if (!this.isRefresh || this.updating) {
				// 	return
				// }
				// if (this.moving) {
				// 	this.runRefresh()
				// }
			},
			runRefresh() {
				this.scrollTop = 0
				this.coverTransition = 'transform .1s linear'
				this.coverTransform = 'translateY(60px)'
				// this.playState = true
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
					// this.playState = false
				}
				this.updating = false
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
