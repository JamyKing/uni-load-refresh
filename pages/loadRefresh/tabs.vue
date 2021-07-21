<template>
	<view class="content">
		<!-- 简单的tabs组件 -->
		<view class="uni-swiper-tab">
			<block v-for="(tab, index) in tabBars" :key="index">
				<view class="swiper-tab-list" 
					:class="{'active':tabIndex === index}"
					@click="tabtap(index)">
					{{tab.name}}
				</view>
			</block>
		</view>
		<!-- swiper组件 -->
		<swiper :style="getHeight" :current="tabIndex" @change="tabChange" :duration="1000">
			<swiper-item v-for="(items, index) in tabBars" :key="index">
				<load-refresh
					:ref="'loadRefresh' + index"
					:isRefresh="true"
					heightReduce="80"
					backgroundCover="#F3F5F5"
					:currentPage="items.currentPage"
					:totalPages="items.totalPages"
					@loadMore="loadData(10)"
					@refresh="loadData(20)">
					<view slot="content-list">
						<view class="data-item" v-for="(item, itemIndex) in items.list" :key="itemIndex">
							<image class="data-image" :src="item.image" mode="aspectFill"></image>
							<view class="data-text">{{item.text}}</view>
						</view>
					</view>
				</load-refresh>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		components: {
			loadRefresh
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{
						name: '未发货',
						currentPage: 1,
						totalPages: 2,
						list: [
							{
								text: 'hello啊',
								image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
							},
							{
								text: '马上来',
								image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
							},
							{
								text: '你瞅啥',
								image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
							},
							{
								text: '有些冷',
								image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
							}
						]
					},
					{
						name: '已发货',
						currentPage: 1,
						totalPages: 2,
						list: [
							{
								text: 'hello啊',
								image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
							},
							{
								text: '马上来',
								image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
							},
							{
								text: '你瞅啥',
								image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
							},
							{
								text: '有些冷',
								image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
							}
						]
					}
				],
			}
		},
		onLoad() {

		},
		computed: {
			getHeight() {
				let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80)
				return `height: ${height}px;`;
			}
		},
		methods: {
			// tabs点击
			tabtap(index){
				this.tabIndex = index
			},
			// 滑动事件
			tabChange(e){
				this.tabIndex = e.detail.current
			},
			loadData(code) {
				// code=10 为加载更多
				// code=20 为下拉刷新
				const { tabIndex, tabBars } = this
				// setTimeout模拟请求接口成功后的回调函数
				setTimeout(() => {
					// newArray 模拟接口返回数据
					let newArray = []
					if (code === 10) {
						// 加载更多
						newArray = [
							{
								text: '帅不帅',
								image: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
							},
							{
								text: '想睡觉',
								image: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
							},
							{
								text: '舒坦啊',
								image: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
							}
						]
					} else {
						// 下拉刷新
						newArray = [
							{
								text: 'hello啊',
								image: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
							},
							{
								text: '马上来',
								image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
							},
							{
								text: '你瞅啥',
								image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
							},
							{
								text: '有些冷',
								image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
							}
						]
					}
					// list赋值
					// Tips: 若是数组较大，建议使用 Array.push()
					let length = tabBars[tabIndex].list.length
					tabBars[tabIndex].list.splice(code === 10 ? length : 0, code === 10 ? 0 : length, ...newArray)
					// 更新页码
					tabBars[tabIndex].currentPage = code === 10 ? 2 : 1
					// 数据更新完成
					this.$refs['loadRefresh' + tabIndex][0].completed()
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #F5F5F5;
	}
	
	/* tabs样式 */
	.uni-swiper-tab{
		width: 100%;
		height: 70rpx;
		padding: 10rpx;
		display: flex;
		font-weight: 400;
		font-size: 32rpx;
		background-color: #FFFFFF;
	}
	.swiper-tab-list{
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
		color: #999999;
		min-width: 160rpx;
		margin: 0 20rpx;
	}
	.active{
		color: #333333;
		border: 2rpx solid #333333;
		border-radius:20upx;
		background: #EDF3F6;
	}
	
	/* 数据集样式 */
	.data-item {
		width: 710rpx;
		background: white;
		margin: 16rpx 20rpx 0;
		border-radius: 16rpx;
		.data-image {
			width: 100%;
			height: 380rpx;
			border-radius: 16rpx 16rpx 0 0;
		}
		.data-text {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 20rpx;
		}
	}
</style>