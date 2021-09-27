<template>
	<view :class="{'pickerMask':visable}" @click="maskClick" @touchmove.stop.prevent="returnHandle">
		<view class="picker-box" :class="{'picker-show':visable}">
			<view class="operate-box" @touchmove.stop.prevent="returnHandle" @tap.stop="returnHandle">
				<view class="time-box">
					<view @click="touchSelect(0)" class="time-item" :style="{color:touchIndex?'#000000':themeColor}">
						<text>{{startText}}</text>
						<text>{{resultDate[0]}}</text>
					</view>
					<text>至</text>
					<view @click="touchSelect(1)" class="time-item" :style="{color:touchIndex?themeColor:'#000000'}">
						<text>{{endText}}</text>
						<text>{{resultDate[1]}}</text>
					</view>
				</view>
				<view :style="{color:themeColor}" @click="pickerConfirm">确定</view>
			</view>
			<picker-view :value="pickerValue" @change="pickerChange" class="picker-view" :indicator-style="indicatorStyle" @tap.stop="returnHandle">
				<picker-view-column>
					<view class="picker-item" v-for="(item,index) in yearList" :key="index">{{index>0||touchIndex<1 ? item+'年' : item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="(item,index) in monthList" :key="index">
						<text v-show="pickerValue[0]>0||touchIndex<1">{{item}}月</text>
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'sofarPicker',
		props: {
			defaultDate: {
				type: Array,
				default: () => []
			},
			visable: {
				type: Boolean,
				default: false
			},
		    minYear: {
				type: Number,
				default: 1990,
			},
			separator: {
				type: String,
				default: '.'
			},
			themeColor:{
				type: String,
				default: '#10BE9D'
			},
			startText: {
				type: String,
				default: '开始时间'
			},
			endText: {
				type: String,
				default: '结束时间'
			}
		},
		data() {
		    const date = new Date();
		    const yearList = [];
		    const year = date.getFullYear();
		    const monthList = [];
		    const month = date.getMonth() + 1;
		    for (let i = this.minYear; i <= date.getFullYear(); i++) {
		        yearList.unshift(i);
		    }
		    for (let i = 1; i <= 12; i++) {
		        monthList.push(i);
		    }
		    return {
				indicatorStyle: 'height: 100rpx;',
				touchIndex: 0,
				yearList: yearList,
				monthList: monthList,
				year: year,
				month: month,
				pickerValue: [0, month - 1],
				resultDate: []
		    }
		},
		mounted() {
			this.setDate()
		},
		methods: {
			returnHandle(){},
			maskClick() {
				this.$emit('update:visable', false)
			},
			setDate() {
				if (this.defaultDate.length > 0) {
					let date = this.defaultDate[0]
					this.resultDate = this.defaultDate
					this.setPicker(date)
				} else {
					let startTime = this.year + this.separator + this.month
					this.resultDate = [startTime, '至今']
				}
			},
			setPicker(date) {
				if (date === '至今') {
					this.pickerValue = [0, 0]
				} else {
					let dateArray = date.split(this.separator)
					let yearIndex = this.yearList.indexOf(Number(dateArray[0]))
					let monthIndex = this.monthList.indexOf(Number(dateArray[1]))
					this.pickerValue = [yearIndex, monthIndex]
				}
			},
			getDate(date) {
				let result = ''
				let year = this.yearList[date[0]]
				let month = this.monthList[date[1]]
				if (year === '至今') {
					result = '至今'
				} else {
					result = year + this.separator + month
				}
				this.resultDate[this.touchIndex] = result
			},
			touchSelect(val) {
				let date = this.resultDate[val]
				if (this.touchIndex === val) {
					return
				} else {
					if (val) {
						this.yearList.unshift('至今')
					} else {
						this.yearList.splice(0, 1)
					}
					this.touchIndex = val
				}
				if (date) {
					this.setPicker(date)
				}
			},
			pickerChange(e) {
				this.pickerValue = e.detail.value
				this.getDate(e.detail.value)
			},
			pickerConfirm() {
				const { resultDate, separator } = this
				let nowTime = new Date().getTime()
				let startTime = new Date(resultDate[0] + separator + '1').getTime()
				let endTime = resultDate[1] === '至今' ? nowTime : new Date(resultDate[1] + separator + '1').getTime()
				if (startTime <= endTime && endTime <= nowTime) {
					this.$emit('confirm', resultDate)
					this.maskClick()
				} else {
					uni.showToast({
						title: '时间范围错误！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pickerMask {
	    position: fixed;
	    z-index: 998;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
	    background: rgba(0, 0, 0, 0.6);
	}
	.picker-box {
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    transition: all 0.3s ease;
	    transform: translateY(100%);
	    z-index: 998;
		.operate-box {
		    display: flex;
			align-items: center;
			justify-content: space-between;
		    padding: 18rpx 30rpx;
		    background-color: #FFFFFF;
		    text-align: center;
		    font-size: 30rpx;
			border-bottom: 2rpx solid #e5e5e5;
			.time-box {
				width: 60%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.time-item {
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
	.picker-show {
	    transform: translateY(0);
	}
	.picker-view {
		width: 750rpx;
		height: 600rpx;
		background-color: #FFFFFF;
		.picker-item {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}
</style>
