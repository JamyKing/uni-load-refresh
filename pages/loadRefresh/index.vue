<template>
    <view class="content">
        <load-refresh ref="loadRefresh" :isRefresh="true" refreshType="hollowDots" color="#04C4C4"
            backgroundCover="#F3F5F5" :currentPage="currentPage" :totalPages="totalPages" @loadMore="loadMore"
            @refresh="refresh">
            <view slot="content-list">
                <view class="post-item" :class="{'u-f':item.type < 3}" v-for="(item,index) in list" :key="index">
                    <!-- 左图右文 -->
                    <block v-if="item.type === 1">
                        <view class="img-left">
                            <image :src="item.pic" mode="aspectFill" lazy-load></image>
                            <view class="shutter-one"></view>
                        </view>
                        <view class="text-right">
                            <view class="title-right">
                                {{item.blogDesc}}
                            </view>
                            <view class="user-one u-f u-f-jsb">
                                <text>{{item.createTime}}</text>
                                <image src="../../static/head.jpg" lazy-load></image>
                            </view>
                        </view>
                    </block>

                    <!-- 左文右图 -->
                    <block v-if="item.type === 2">
                        <view class="text-left">
                            <view class="title-left">
                                {{item.blogDesc}}
                            </view>
                            <view class="user-one u-f u-f-jsb">
                                <image src="../../static/head.jpg" lazy-load></image>
                                <text>{{item.createTime}}</text>
                            </view>
                        </view>
                        <view class="img-right">
                            <image :src="item.pic" mode="aspectFill" lazy-load></image>
                            <view class="shutter-two"></view>
                        </view>
                    </block>

                    <!-- 纯图片 -->
                    <block v-if="item.type === 3">
                        <view class="img-only" :style="{backgroundImage: 'url(' + item.pic + ')'}">
                            <view class="vague"></view>
                            <view class="user-three">
                                <image src="../../static/head.jpg" lazy-load></image>
                                <text>{{item.createTime}}</text>
                            </view>
                            <image src="../../static/shutter.png" class="shutter-three" lazy-load></image>
                        </view>
                    </block>

                    <!-- 纯文字 -->
                    <block v-if="item.type === 4">
                        <view class="text-only">{{item.blogDesc}}</view>
                        <view class="user-two">
                            <image src="../../static/head.jpg" lazy-load></image>
                            <text>{{item.createTime}}</text>
                        </view>
                    </block>
                </view>
            </view>
        </load-refresh>
        <view class="fixed-bottom" @click="runRefresh">刷新</view>
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
                list: [],
                currentPage: 1, // 模拟当前页码
                totalPages: 2 // 模拟总页数
            }
        },
        onLoad() {
            this.loadData()
        },
        methods: {
            loadData() {
                this.list = [{
                        type: 1,
                        pic: '../../static/pic1.jpg',
                        blogDesc: '啦啦啦啦啦啦啦',
                        createTime: '2020-5-16'
                    },
                    {
                        type: 2,
                        pic: '../../static/pic2.jpg',
                        blogDesc: '啦啦啦啦啦啦啦',
                        createTime: '2020-5-17'
                    },
                    {
                        type: 1,
                        pic: '../../static/pic3.jpg',
                        blogDesc: '啦啦啦啦啦啦啦',
                        createTime: '2020-5-18'
                    },
                    {
                        type: 2,
                        pic: '../../static/pic4.jpg',
                        blogDesc: '啦啦啦啦啦啦啦',
                        createTime: '2020-5-19'
                    }
                ]
            },
            // 加载更多
            loadMore() {
                // showToast 方便演示查看效果 实际开发中可以删除
                uni.showToast({
                    title: '加载中',
                    icon: 'loading'
                })
                // 模拟请求
                // 建议在请求后端传值时，页码使用 currentPage + 1
                // 建议在请求成功后的回调函数中，更新赋值currentPage、并使用completed()结束
                setTimeout(() => {
                    // 模拟请求成功
                    let arr = [{
                            type: 1,
                            pic: '../../static/pic5.png',
                            blogDesc: '啦啦啦啦啦啦啦',
                            createTime: '2020-5-20'
                        },
                        {
                            type: 3,
                            pic: '../../static/pic6.jpg',
                            createTime: '2020-5-21'
                        }
                    ]
                    // 添加至list
                    this.list = [...this.list, ...arr]
                    // 更新当前页码
                    this.currentPage = 2
                    // 结束动画
                    this.$refs.loadRefresh.completed()
                }, 1000)
            },
            // 下拉刷新
            refresh() {
                uni.showToast({
                    title: '刷新中',
                    icon: 'loading'
                })
                // 模拟请求
                setTimeout(() => {
                    // 模拟请求成功
                    let arr = [{
                            type: 1,
                            pic: '../../static/pic1.jpg',
                            blogDesc: '啦啦啦啦啦啦啦',
                            createTime: '2020-5-16'
                        },
                        {
                            type: 2,
                            pic: '../../static/pic2.jpg',
                            blogDesc: '啦啦啦啦啦啦啦',
                            createTime: '2020-5-17'
                        },
                        {
                            type: 1,
                            pic: '../../static/pic3.jpg',
                            blogDesc: '啦啦啦啦啦啦啦',
                            createTime: '2020-5-18'
                        },
                        {
                            type: 2,
                            pic: '../../static/pic4.jpg',
                            blogDesc: '啦啦啦啦啦啦啦',
                            createTime: '2020-5-19'
                        }
                    ]
                    // 添加至list
                    this.list = arr
                    // 更新当前页码
                    this.currentPage = 1
                    // 结束动画
                    this.$refs.loadRefresh.completed()
                }, 1800)
            },
            runRefresh() {
                this.$refs.loadRefresh.runRefresh()
            }
        }
    }
</script>

<style lang="scss">
    .content {
        height: 100%;
        width: 100%;
        background: #F3F5F5;
    }

    .u-f,
    .u-f-ac,
    .u-f-ajc {
        display: flex;
    }

    .u-f-ac,
    .u-f-ajc {
        align-items: center;
    }

    .u-f-ajc {
        justify-content: center;
    }

    .u-f-jsb {
        justify-content: space-between;
    }

    .u-f1 {
        flex: 1;
    }

    .u-f-column {
        flex-direction: column;
    }

    .post-item {
        width: 100%;
        background: white;
        margin-bottom: 16rpx;

        /* 左图右文 */
        .img-left {
            width: 64%;
            height: 380rpx;
            position: relative;

            image {
                width: 100%;
                height: 100%;
            }

            .shutter-one {
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                height: 0;
                border-top: 380rpx solid white;
                border-left: 97rpx solid transparent;
            }
        }

        .text-right {
            width: 36%;
            height: 380rpx;
            position: relative;

            .title-right {
                position: absolute;
                top: 16rpx;
                left: -30rpx;
                width: 100%;
                height: 84rpx;
                line-height: 42rpx;
                font-size: 30rpx;
                font-weight: 400;
                color: #666666;
                overflow: hidden;
                z-index: 10;
            }

            .user-one {
                position: absolute;
                bottom: 0;
                width: 86%;
                height: 56rpx;
                padding: 8rpx 20rpx;

                text {
                    color: #AAAAAA;
                    font-size: 22rpx;
                    font-weight: 400;
                }

                image {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 100%;
                }
            }
        }

        /* 左文右图 */
        .text-left {
            width: 36%;
            height: 380rpx;
            position: relative;

            .title-left {
                position: absolute;
                top: 16rpx;
                left: 30rpx;
                width: 100%;
                height: 84rpx;
                line-height: 42rpx;
                font-size: 30rpx;
                font-weight: 400;
                color: #666666;
                overflow: hidden;
                z-index: 10;
            }

            .user-one {
                position: absolute;
                bottom: 0;
                width: 86%;
                height: 56rpx;
                padding: 8rpx 20rpx;

                text {
                    color: #AAAAAA;
                    font-size: 22rpx;
                    font-weight: 400;
                }

                image {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 100%;
                }
            }
        }

        .img-right {
            width: 64%;
            height: 380rpx;
            position: relative;

            image {
                width: 100%;
                height: 100%;
            }

            .shutter-two {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-top: 380rpx solid white;
                border-right: 97rpx solid transparent;
            }
        }

        /* 纯文字 */
        .text-only {
            width: 100%;
            max-height: 114rpx;
            padding: 15rpx 20rpx;
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
            line-height: 42rpx;
            overflow: hidden;
        }

        .user-two {
            display: flex;
            flex-direction: row-reverse;
            height: 50rpx;

            text {
                color: #AAAAAA;
                font-size: 22rpx;
                font-weight: 400;
            }

            image {
                width: 40rpx;
                height: 40rpx;
                border-radius: 100%;
                margin: 0 20rpx 0 60rpx;
            }
        }

        /* 纯图片 */
        .img-only {
            width: 100%;
            height: 400rpx;
            position: relative;
            background-size: cover;
            background-position: center;

            .post-img {
                width: 100%;
                height: 100%;
            }

            .vague {
                width: 100%;
                height: 60rpx;
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 0;
                background: inherit;
                background-position: bottom;
                filter: blur(5px);
            }

            .user-three {
                width: 100%;
                height: 60rpx;
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 0;

                text {
                    color: #FFFFFF;
                    font-size: 22rpx;
                    font-weight: 400;
                }

                image {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 100%;
                    margin: 0 60rpx 0 20rpx;
                }
            }

            .shutter-three {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }

    .fixed-bottom {
        position: fixed;
        bottom: 120rpx;
        right: 60rpx;
        width: 100rpx;
        height: 100rpx;
        color: #409eff;
        border-radius: 50%;
        text-align: center;
        line-height: 100rpx;
        box-shadow: 0 0 10rpx rgba(0, 0, 0, .12);
        background-color: #FFFFFF;
    }
</style>
