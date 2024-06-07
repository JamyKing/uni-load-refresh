<template>
    <view>
        <structure-cascade
            ref="strCascade"
            v-model="strResults"
            :checkIcon="require('@/static/icons/selected.png')"
            :moreIcon="require('@/static/icons/arrow-right.png')"
            :treeData="treeData">
        </structure-cascade>
        <view class="bottom-box">
            <button class="bottom-btn" @click="confirmBtn">确认</button>
        </view>
    </view>
</template>

<script>
    import structureCascade from '@/components/structure-cascade/structure-cascade.vue'
    export default {
        components: {
            structureCascade
        },
        data() {
            return {
                treeData: [
                    {
                        "id": "1",
                        "parentId": "0",
                        "name": "一级_1",
                        "children": [
                            {
                                "id": "2",
                                "parentId": "1",
                                "name": "二级_1-1",
                                "children": [
                                    {
                                        "id": "3",
                                        "parentId": "2",
                                        "name": "三级_1-1-1",
                                        "children": [
                                            {
                                                "id": "4",
                                                "parentId": "3",
                                                "name": "四级_1-1-1-1"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "5",
                                        "parentId": "2",
                                        "name": "三级_1-1-2",
                                        "children": [
                                            {
                                                "id": "6",
                                                "parentId": "5",
                                                "name": "四级_1-1-2-1"
                                            },
                                            {
                                                "id": "7",
                                                "parentId": "5",
                                                "name": "四级_1-1-2-2",
                                                "children": [
                                                    {
                                                        "id": "8",
                                                        "parentId": "7",
                                                        "name": "五级1-1-2-2-1"
                                                    },
                                                    {
                                                        "id": "9",
                                                        "parentId": "7",
                                                        "name": "五级1-1-2-2-2"
                                                    },
                                                    {
                                                        "id": "10",
                                                        "parentId": "7",
                                                        "name": "五级1-1-2-2-3"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                strResults: [
                    // {
                    //     id: '3',
                    //     name: '三级_1-1-1'
                    // }
                ] // 存在数据则默认选中
            }
        },
        onLoad() {
            
        },
        methods: {
            confirmBtn() {
                if (this.strResults.length) {
                    uni.showModal({
                        title: '结果',
                        content: JSON.stringify(this.strResults)
                    })
                } else {
                    uni.showToast({
                        title: '请先选择！',
                        icon: 'none'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bottom-box {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 5;
        padding: 0 20rpx 58rpx;
        box-sizing: border-box;
        .bottom-btn {
            width: 100%;
            height: 88rpx;
            color: #FFFFFF;
            font-size: 36rpx;
            border-radius: 12rpx;
            line-height: 88rpx;
            background-color: #1677FF;
        }
    }
</style>