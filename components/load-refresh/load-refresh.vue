<template>
	<view class="load-refresh">
		<!-- 刷新动画 -->
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
			<scroll-view scroll-y show-scrollbar="true" class="list" :scroll-top="scrollTop" @scrolltolower="loadMore" :style="getHeight">
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
			refreshTime: {
				type: String,
				default: '1000'
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
				hasMore: true,
				moving: false,
				refresh: false,
				loading: false,
				scrollTop: -1,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				playState: 'paused' // 动画的状态 暂停/开始
			}
		},
		computed: {
			// 计算组件所占屏幕高度
			getHeight() {
				let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(0 + this.heightReduce)
				return `height: ${height}px;`
			},
			// 判断loadText
			// 可以根据需求自定义
			loadText() {
				const { pageNo, totalPageNo, loading } = this
				if (loading) {
					return '加载中...'
				} else if (pageNo < totalPageNo) {
					return '上拉加载更多'
				} else {
					return '已经到底啦~'
				}
			}
		},
		watch: {
			// 监听refresh值 避免多次触发@refresh
			'refresh'(val) {
				if (val) {
					this.$emit('refresh')
				}
			}
		},
		methods: {
			// 根据pageNo和totalPageNo的值来判断 是否触发@loadMore
			loadMore() {
				const { pageNo, totalPageNo } = this
				if (pageNo < totalPageNo) {
					this.loading = true
					this.$emit('loadMore')
				}
			},
			// 单次加载结束
			loadOver() {
				this.loading = false
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
				if (!this.isRefresh || this.refresh) {
					return
				}
				this.moveY = e.touches[0].clientY
				let moveDistance = this.moveY - this.startY
				if(moveDistance < 0){
					this.moving = false
					return
				}
				this.moving = true
				if(moveDistance >= 60){
					this.refresh = true
					this.coverTransform = `translateY(60px)`
					this.playState = 'running'
				}
			},
			coverTouchend() {
				if (!(this.isRefresh && this.refresh)) {
					return
				}
				setTimeout(() => {
					if(this.moving === false){
						return
					}
					this.moving = false
					this.refresh = false
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
					this.playState = 'paused'
				}, this.refreshTime)
			},
			runRefresh() {
				// 开始
				this.scrollTop = 0
				this.refresh = true
				this.coverTransition = 'transform .1s linear'
				this.coverTransform = `translateY(60px)`
				this.playState = 'running'
				// 结束
				setTimeout(() => {
					this.scrollTop = -1
					this.refresh = false
					this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
					this.coverTransform = 'translateY(0px)'
					this.playState = 'paused'
				}, this.refreshTime)
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
