<template>
    <view class="container">
        <view class="header">
            <scroll-view class="nav-tree" scroll-x enable-flex="true" :scroll-left="scrollLeft">
                <view v-for="(item, index) in navTreeList" :key="item[valueField]" class="nav-tree-item">
                    <text :class="{special: index < navLen - 1 }" class="text" @click="handleNavgiateToDept(index)">
                        {{ item[labelField] }}
                    </text>
                    <text v-if="index < navLen - 1" class="right-text"> > </text>
                </view>
            </scroll-view>
        </view>
        <view class="content">
            <view class="dept-list">
                <view v-for="item in listData" :key="item[valueField]" class="dept-list-item"
                    @click="handleToChild(item)">
                    <block v-if="checkIcon">
                        <image v-if="item.checked" :src="checkIcon" class="check-icon" @click.stop="handleChoose(item)"></image>
                        <view v-else class="checkbox" @click.stop="handleChoose(item)"></view>
                    </block>
                    <view v-if="!checkIcon" :class="{active: item.checked }" class="checkbox"
                        @click.stop="handleChoose(item)"></view>
                    <view class="text">{{ item[labelField] }}</view>
                    <image v-if="moreIcon && !isEmpty(item.children)" :src="moreIcon" class="more-icon"></image>
                    <text v-if="!moreIcon && !isEmpty(item.children)" class="more-text"> > </text>
                </view>
            </view>
        </view>
        <view class="bottom-gap"></view>
    </view>
</template>

<script>
    export default {
        name: 'structureCascade',
        props: {
            value: {
                type: Array,
                default: () => []
            },
            treeData: {
                type: Array,
                default: () => []
            },
            isRadio: {
                type: Boolean,
                default: true
            },
            selectMax: {
                type: Number,
                default: 0
            },
            topTitle: {
                type: String,
                default: '组织架构'
            },
            valueField: {
                type: String,
                default: 'id'
            },
            labelField: {
                type: String,
                default: 'name'
            },
            checkIcon: {
                type: String,
                default: ''
            },
            moreIcon: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                listData: [],
                scrollLeft: 0,
                navTreeList: [],
                selectedList: []
            }
        },
        computed: {
            navLen() {
                // 处理动态增减导航项时小程序无法渲染样式问题
                return this.navTreeList.length
            }
        },
        watch: {
            topTitle: {
                handler(val) {
                    this.navTreeList = [{
                        [this.valueField]: 0,
                        [this.labelField]: this.topTitle
                    }]
                },
                deep: true,
                immediate: true
            },
            treeData: {
                handler(val) {
                    if (!this.isEmpty(val)) {
                        this.initList()
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            initList() {
                if (this.isEmpty(this.value)) {
                    this.listData = this.deepCopy(this.treeData)
                } else {
                    if (this.isRadio) {
                        const topList = this.getParentNodes(this.treeData, this.value[0])
                        this.navTreeList.push(...topList)
                        const length = this.navTreeList.length
                        this.listData = this.deepCopy(this.navTreeList[length - 1].children)
                        this.scrollLeft = length * 100
                    } else {
                        this.listData = this.deepCopy(this.treeData)
                    }
                    this.selectedList = this.deepCopy(this.value)
                }
                this.updateChecked()
            },
            updateChecked() {
                const key = this.valueField
                const keys = (this.selectedList || []).map(o => o[key])
                this.listData.forEach(item => {
                    if (keys.includes(item[key])) {
                        this.$set(item, 'checked', true)
                    } else {
                        this.$set(item, 'checked', false)
                    }
                })
            },
            handleToSearch(keyword) {
                if (keyword) {
                    this.listData = this.deepCopy(this.getFilterData(keyword))
                } else {
                    this.listData = this.deepCopy(this.treeData)
                }
            },
            // 跳转到子项
            handleToChild(item) {
                if (!this.isEmpty(item.children)) {
                    this.listData = this.deepCopy(item.children)
                    this.navTreeList.push({
                        [this.valueField]: item[this.valueField],
                        [this.labelField]: item[this.labelField]
                    })
                    this.scrollLeft += 100
                    this.updateChecked()
                } else {
                    this.handleChoose(item)
                }
            },
            // 导航切换
            handleNavgiateToDept(index) {
                if (index >= this.navTreeList.length - 1) return
                const item = this.navTreeList[index]
                this.navTreeList.splice(index + 1)
                this.calculateFun(this.treeData, this.navTreeList)
            },
            calculateFun(tree, arr) {
                arr = arr.slice(1)
                if (arr.length) {
                    for (let item of tree) {
                        if (item[this.valueField] === arr[0][this.valueField]) {
                            this.calculateFun(item.children, arr)
                            break
                        }
                    }
                } else {
                    this.listData = this.deepCopy(tree)
                    this.updateChecked()
                }
            },
            // 切换选中
            handleChoose(item) {
                this.$set(item, 'checked', !item.checked)
                if (this.isRadio) {
                    if (item.checked) {
                        this.selectedList = [{
                            [this.valueField]: item[this.valueField],
                            [this.labelField]: item[this.labelField]
                        }]
                        this.updateChecked()
                    } else {
                        this.selectedList = []
                    }
                } else {
                    if (item.checked) {
                        // 勾选
                        if (this.selectMax !== 0 && this.selectedList.length >= this.selectMax) {
                            this.selectedList.splice(this.selectMax - 1)
                        }
                        this.selectedList.push({
                            [this.valueField]: item[this.valueField],
                            [this.labelField]: item[this.labelField]
                        })
                        this.updateChecked()
                    } else {
                        // 取消勾选
                        const findIndex = this.selectedList.findIndex(o => o[this.valueField] === item[this.valueField])
                        if (findIndex !== -1) {
                            this.selectedList.splice(findIndex, 1)
                        }
                    }
                }
                this.$nextTick(() => {
                    this.$emit('input', this.selectedList)
                })
            },
            isEmpty(data) {
                if (data === null) return true
                if (data === undefined) return true
                if (Object.prototype.toString.call(data) === '[object Array]') return data.length === 0
                if (Object.prototype.toString.call(data) === '[object Object]') return Object.keys(data).length === 0
                if (typeof data === 'string') return data.trim() === ''
                return false
            },
            deepCopy(source) {
                if (typeof source === 'object') {
                    var sourceCopy = Array.isArray(source) ? [] : {}
                    for (var item in source) {
                        if (!source[item]) {
                            sourceCopy[item] = source[item]
                        } else {
                            sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[item]
                        }
                    }
                    return sourceCopy
                }
                return source
            },
            // 获取目标节点aim的所有祖宗节点 不包括aim本身
            getParentNodes(tree, aim) {
                let temp = [] //结果对象
                const valueField = this.valueField
                let forFn = function(arr, key) {
                    for (let i = 0; i < arr.length; i++) {
                        let item = arr[i]
                        if (item[valueField] === key) {
                            forFn(tree, item.parentId)
                            if (item[valueField] !== aim[valueField]) {
                                temp.push(item)
                            }
                            break
                        } else {
                            if (item.children) {
                                forFn(item.children, key)
                            }
                        }
                    }
                }
                forFn(tree, aim[this.valueField])
                return temp
            },
            // 根据检索条件返回一维数组
            getFilterData(keyword, data = this.treeData) {
                var result = []
                const valueField = this.valueField
                const labelField = this.labelField
                var fn = function(data) {
                    if (Array.isArray(data)) {
                        data.forEach(item => {
                            if (item.name.includes(keyword)) {
                                result.push({
                                    [valueField]: item[valueField],
                                    [labelField]: item[labelField]
                                })
                            } else if (item.children) {
                                fn(item.children)
                            }
                        })
                    }
                }
                fn(data)
                return result
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .header {
            width: 100%;
            padding: 30rpx 36rpx;
            background-color: white;
            .nav-tree {
                width: 678rpx;
                height: 40rpx;
                display: flex;
                white-space: nowrap;
                .nav-tree-item {
                    flex-shrink: 0;
                    font-size: 28rpx;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    .special {
                        color: #1677FF;
                    }
                    .right-text {
                        color: #333333;
                        margin: 0 16rpx 6rpx;
                    }
                    .right-icon {
                        width: 36rpx;
                        height: 36rpx;
                        margin: 0 10rpx;
                    }
                }
            }
        }

        .content {
            padding: 0 36rpx;
            background-color: white;
            .dept-list {
                display: flex;
                flex-direction: column;
                .dept-list-item {
                    font-size: 28rpx;
                    padding: 30rpx 0;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    border-top: 1rpx solid #EEEEEE;
                    .checkbox {
                        width: 36rpx;
                        height: 36rpx;
                        text-align: center;
                        border: 4rpx solid #A5ADBA;
                        border-radius: 50%;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        &.active {
                            border-color: #1677FF;
                            background-color: #1677FF;
                        }
                    }
                    .check-icon {
                        width: 36rpx;
                        height: 36rpx;
                    }
                    .text {
                        flex: 1;
                        margin-left: 36rpx;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .more-icon {
                        width: 40rpx;
                        height: 40rpx;
                        margin-right: 15rpx;
                    }
                    .more-text {
                        color: #919191;
                    }
                }
            }
        }

        .bottom-gap {
            width: 100%;
            height: 200rpx;
        }
    }
</style>