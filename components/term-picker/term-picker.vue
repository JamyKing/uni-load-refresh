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
				    <view class="picker-item" v-for="(item, index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
				    <view class="picker-item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
				</picker-view-column>
				<picker-view-column v-if="days.length > 0">
				    <view class="picker-item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>
<script>
    export default {
        name: 'termPicker',
        props: {
			visable: {
				type: Boolean,
				default: false
			},
			defaultDate: {
				type: Array,
				default: () => []
			},
            minYear: {
                type: Number,
                default: 1990,
            },
			timeLimit: {
				type: Boolean,
				default: false
			},
			deferYear: {
				type: Number,
				default: 0,
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
            const years = [];
            const year = date.getFullYear();
            const months = [];
            const month = date.getMonth() + 1;
            const day = date.getDate();
			const maxYear = this.timeLimit ? year : year + this.deferYear
            for (let i = this.minYear; i <= maxYear; i++) {
                years.push(i);
            }
            for (let i = 1; i <= 12; i++) {
                months.push(i);
            }
            return {
                indicatorStyle: 'height: 100rpx;',
                touchIndex: 0,
                year,
				month,
				day,
				years,
                months,
                days: [],
				pickerValue: [],
				resultDate: []
            };
        },
		mounted() {
			this.setDate()
		},
        methods: {
			returnHandle(){},
			setDate() {
				if (this.defaultDate.length > 0) {
					let date = this.defaultDate[0]
					this.resultDate = this.defaultDate
					this.setPicker(date)
				} else {
					let month = this.month < 10 ? '0' + this.month : this.month
					let day = this.day < 10 ? '0' + this.day : this.day
					let nowTime = this.year + '-' + month + '-' + day
					this.resultDate = [nowTime, nowTime]
					this.setPicker(nowTime)
				}
			},
			setPicker(date) {
				const splitVal = date.split('-')
				let year = this.years.indexOf(Number(splitVal[0]))
				let month = Number(splitVal[1]) - 1
				let day = Number(splitVal[2]) - 1
				this.pickerChange({
					detail: {
						value: [year, month, day]
					}
				})
			},
			touchSelect(val) {
				let date = this.resultDate[val]
				this.touchIndex = val
				this.setPicker(date)
			},
			getDateTime(date) {
				let year = this.years[date[0]]
				let month = this.months[date[1]]
				let day = this.days[date[2]]
				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day
				}
				this.resultDate[this.touchIndex] =  year + '-' + month + '-' + day
			},
			pickerChange(e) {
			    const currents = e.detail.value
			    if (currents[1] + 1 === 2) {
			        this.days = []
			        if (
			            ((currents[0] + this.minYear) % 4 === 0 &&
			                (currents[0] + this.minYear) % 100 !== 0) ||
			            (currents[0] + this.minYear) % 400 === 0
			        ) {
			            for (let i = 1; i < 30; i++) {
			                this.days.push(i)
			            }
			        } else {
			            for (let i = 1; i < 29; i++) {
			                this.days.push(i)
			            }
			        }
			    } else if ([4, 6, 9, 11].some((item) => currents[1] + 1 === item)) {
			        this.days = []
			        for (let i = 1; i < 31; i++) {
			            this.days.push(i)
			        }
			    } else if (
			        [1, 3, 5, 7, 8, 10, 12].some((item) => currents[1] + 1 === item)
			    ) {
			        this.days = []
			        for (let i = 1; i < 32; i++) {
			            this.days.push(i)
			        }
			    }
				this.pickerValue = currents
				this.getDateTime(currents)
			},
			maskClick() {
				this.$emit('update:visable', false)
			},
            pickerConfirm() {
				const { resultDate, timeLimit } = this
				let startTime = new Date(resultDate[0]).getTime()
				let endTime = new Date(resultDate[1]).getTime()
				let nowTime = timeLimit ? new Date().getTime() : endTime
				if (startTime <= endTime && endTime <= nowTime) {
					this.$emit('confirm', resultDate)
					this.maskClick()
				} else {
					uni.showToast({
						title: '时间范围不正确！',
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