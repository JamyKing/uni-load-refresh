<template>
    <view class="content">
        <view class="header">
            <view class="date-item">日期范围：{{startTime}} 至 {{endTime}}</view>
        </view>
        <button class="date-btn" type="default" @click="openPicker">打开</button>
        <term-picker :visable.sync="pickerVisable" :defaultDate="defaultDate" :deferYear="1" @confirm="confirm">
        </term-picker>
    </view>
</template>

<script>
    import termPicker from '@/components/term-picker/term-picker.vue'
    export default {
        components: {
            termPicker
        },
        data() {
            return {
                pickerVisable: false,
                defaultDate: [],
                startTime: '',
                endTime: ''
            }
        },
        methods: {
            openPicker() {
                this.pickerVisable = true
            },
            confirm(date) {
                this.startTime = date[0]
                this.endTime = date[1]
            }
        }
    }
</script>

<style>
    .header {
        width: 100%;
        padding: 60rpx 30rpx;
        display: flex;
        flex-direction: column;
    }

    .date-item {
        margin-bottom: 30rpx;
    }

    .date-btn {
        width: 500rpx;
        height: 80rpx;
        line-height: 80rpx;
    }
</style>
