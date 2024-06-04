<template>
    <view class="uni-app">
        <view class="main-container">
            <view class="container">
                <view class="header">
                    <!-- <search-box @search="handleToSearch" /> -->

                    <view class="nav-tree-wrapper">
                        <view class="nav-tree">
                            <view v-for="(item, index) in navTreeList" :key="item.id" class="nav-tree-item">
                                <text :class="{special: index < navLen - 1 }" class="text"
                                    @click="handleNavgiateToDept(index)">
                                    {{ item.name }}
                                </text>
                                <text v-if="index < navLen - 1" class="right-text"> > </text>
                                <!-- <image v-if="index < navLen - 1" src="@/static/icons/arrow-right.png"
                                    class="right-icon" /> -->
                            </view>
                        </view>
                    </view>
                </view>

                <view class="content">
                    <view v-if="!isEmpty(listData)" class="dept-list">
                        <view class="box"></view>

                        <view v-for="item in listData" :key="item[valueField]" class="dept-list-item"
                            @click="handleToChild(item)">
                            <view :class="{active: item.checked }" class="checkbox" @click.stop="handleChoose(item)">
                                <text v-if="item.checked" class="icon"></text>
                                <!-- <image v-if="item.checked" src="@/static/icons/selected.png" class="select-icon" /> -->
                            </view>

                            <image src="@/static/icons/structure.png" class="dept-icon" />

                            <view class="text">
                                {{ item[labelField] }}
                            </view>
                            <text v-if="!isEmpty(item.children)" class="more-text"> > </text>
                            <!-- <image v-if="!isEmpty(item.children)" src="@/static/icons/arrow-right.png"
                                class="more-icon" /> -->
                        </view>
                    </view>
                </view>
                <view class="footer">
                    <view class="left">
                        <view class="total-box">
                            <text class="total">
                                已选择：{{ selectedList.length }}个
                            </text>
                            <text class="wk wk-icon-arrow-right icon" />
                        </view>
                        <view class="desc">
                            （不包含子项）
                        </view>
                    </view>
                    <view class="confirm-btn" @click="handleConfirm">
                        确定
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'structureCascade',
        props: {
            topTitle: {
                type: String,
                default: '组织架构'
            },
            treeData: {
                type: Array,
                default: () => []
            },
            isRadio: {
                type: Boolean,
                default: true
            },
            valueField: {
                type: String,
                default: 'id'
            },
            labelField: {
                type: String,
                default: 'name'
            },
            defaultValue: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                navTreeList: [],
                selectedList: [],
                listData: [],
                deptData: [],
                copyList: null,
                defaultVal: null,
                routerQuery: {},
                bridge: {}
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
        onLoad(options) {
            // this.routerQuery = options || {}
            // this.bridge = getApp().globalData.selectedValBridge.dept || {}
            // this.selectedList = []
            // if (!isEmpty(this.bridge.defaultVal)) {
            //     this.bridge.defaultVal.forEach(item => {
            //         this.selectedList.push({
            //             ...item,
            //             'deptId': item.id
            //         })
            //     })
            // }
            // this.selectedList = this.bridge.defaultVal || []
        },
        methods: {
            // 空数组 空对象 去掉首尾空格的空字符串 都为记为空
            isEmpty(data) {
                if (data === null) return true
                if (data === undefined) return true
                if (Object.prototype.toString.call(data) === '[object Array]') return data.length === 0
                if (Object.prototype.toString.call(data) === '[object Object]') return Object.keys(data).length === 0
                if (typeof data === 'string') return data.trim() === ''
                return false
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
            getFilterData(data, keyworad) {
                var result = []
                var fn = function(data) {
                    if (Array.isArray(data)) { // 判断是否是数组并且没有的情况下，
                        data.forEach(item => {
                            if (item.name.includes(keyworad)) { // 数据循环每个子项，并且判断子项下边是否有id值
                                result.push(item) // 返回的结果等于每一项
                            } else if (item.children) {
                                fn(item.children) // 递归调用下边的子项
                            }
                        })
                    }
                }
                fn(data) // 调用一下
                return result
            },
            // 对象深拷贝
            deepCopy(source) {
                if (typeof source === 'object') {
                    var sourceCopy = Array.isArray(source) ? [] : {}
                    for (var item in source) {
                        if (!source[item]) {
                            sourceCopy[item] = source[item]
                        } else {
                            sourceCopy[item] = typeof source[item] === 'object' ? this.deepCopy(source[item]) : source[
                                item]
                        }
                    }
                    return sourceCopy
                }
                return source
            },
            initList() {
                if (this.isEmpty(this.defaultValue)) {
                    this.listData = this.treeData
                } else {
                    const topList = this.getParentNodes(this.treeData, this.defaultValue)
                    this.navTreeList.push(...topList)
                    const length = this.navTreeList.length
                    this.listData = this.navTreeList[length - 1].children
                    this.selectedList = [this.defaultValue]
                }
                this.getDefaultChecked()
                this.copyList = null
            },
            getDefaultChecked() {
                const key = this.valueField
                const deptIds = (this.selectedList || []).map(o => o[key])
                this.listData.forEach(item => {
                    if (deptIds.includes(item[key])) {
                        this.$set(item, 'checked', true)
                    } else {
                        this.$set(item, 'checked', false)
                    }
                })
            },
            handleToSearch(keyworad) {
                if (!this.copyList) {
                    this.copyList = [...this.listData]
                }
                if (this.isEmpty(keyworad)) {
                    this.listData = [...this.copyList]
                    this.copyList = null
                    return
                }
                this.listData = this.getFilterData(this.treeData, keyworad)
                // this.listData = this.copyList.filter(o => o[this.labelField].includes(keyworad))
            },
            // 跳转到子部门
            handleToChild(item) {
                console.log(this.navTreeList)
                if (!this.isEmpty(item.children)) {
                    this.listData = item.children
                    this.copyList = null
                    this.navTreeList.push({
                        [this.valueField]: item[this.valueField],
                        [this.labelField]: item[this.labelField]
                    })
                    this.getDefaultChecked()
                } else {
                    this.handleChoose(item)
                }
            },
            // 导航切换部门
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
                    this.listData = tree
                    this.getDefaultChecked()
                }
            },
            
            /**
             * 切换选中
             * @param {Object} item
             * @param {Object} type
             */
            handleChoose(item) {
                this.$set(item, 'checked', !item.checked)
                const key = this.valueField

                if (this.isRadio) {
                    if (item.checked) {
                        this.selectedList = [item]
                        this.getDefaultChecked()
                    } else {
                        this.selectedList = []
                    }
                } else {
                    if (item.checked) {
                        // 勾选
                        if (this.selectMax !== 0 && this.selectedList.length >= this.selectMax) {
                            this.selectedList.splice(this.selectMax - 1)
                        }
                        this.selectedList.push(item)
                        this.getDefaultChecked()
                    } else {
                        // 取消勾选
                        const findIndex = this.selectedList.findIndex(o => o[key] === item[key])
                        if (findIndex !== -1) {
                            this.selectedList.splice(findIndex, 1)
                        }
                    }
                }
            },
            handleRemove(index) {
                this.selectedList.splice(index, 1)
                this.getDefaultChecked()
            },
            handleConfirm() {
                // const data = {
                //     guid: this.bridge.guid,
                //     bridge: this.bridge,
                //     data: this.selectedList
                // }
                console.log('selectedList: ', this.selectedList)
                // if (this.bridge.config && this.bridge.config.checkFn) {
                //     const res = this.bridge.config.checkFn(data)
                //     if (!res) return
                // }
                // uni.$emit('selected-dept', data)
                // this.$Router.navigateBack()
            }
        }
    }
</script>

<style scoped lang="scss">
    $active-color: #1C69FF;


    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .header {
            width: 100%;
            background-color: white;

            .nav-tree-wrapper {
                padding: 15rpx 4% 30rpx;

                .nav-tree {
                    width: 100%;
                    flex-wrap: nowrap;
                    overflow: auto;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .nav-tree-item {
                        flex-shrink: 0;
                        font-size: 28rpx;
                        color: #6B778C;
                        display: flex;
                        align-items: center;

                        .special {
                            color: $active-color;
                        }

                        .right-text {
                            color: #A5ADBA;
                            margin: 0 16rpx;
                        }

                        .right-icon {
                            width: 36rpx;
                            height: 36rpx;
                            margin: 0 10rpx;
                        }
                    }
                }
            }
        }

        .content {
            flex: 1;
            overflow: auto;

            .dept-list {
                .box {
                    width: 100%;
                    height: 16rpx;
                }

                .dept-list-item {
                    position: relative;
                    // width: 100%;
                    font-size: 30rpx;
                    padding: 20rpx 4%;
                    background-color: white;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .checkbox {
                        width: 30rpx;
                        height: 30rpx;
                        text-align: center;
                        border: 4rpx solid #A5ADBA;
                        border-radius: 50%;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 26rpx;

                        .icon {
                            font-size: 26rpx;
                            line-height: 1;
                            color: white;
                        }

                        .select-icon {
                            width: 30rpx;
                            height: 30rpx;
                        }

                        &.active {
                            border-color: $active-color;
                            background-color: $active-color;
                        }
                    }

                    .dept-icon {
                        width: 74rpx;
                        height: 74rpx;
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

                    &::after {
                        position: absolute;
                        bottom: 1rpx;
                        right: 0;
                        content: '';
                        width: calc(100% - 190rpx);
                        height: 1rpx;
                        background-color: #EBEEF1;
                        display: block;
                    }

                    &:last-child::after {
                        display: none;
                    }
                }
            }
        }

        .footer {
            position: relative;
            z-index: 1;
            height: 104rpx;
            box-shadow: 0 -4rpx 14rpx rgba(220, 220, 220, 0.7);
            background-color: white;
            padding: 0 4%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .left {
                flex: 1;
                overflow: hidden;
                margin-right: 30rpx;

                .total-box {
                    width: 100%;
                    font-size: 28rpx;
                    color: $active-color;

                    .total {
                        margin-right: 15rpx;
                    }

                    .icon {
                        transform: rotate(-90deg);
                        display: inline-block;
                    }
                }

                .desc {
                    font-size: 24rpx;
                    color: #A5ADBA;
                }
            }

            .confirm-btn {
                width: 170rpx;
                height: 74rpx;
                font-size: 28rpx;
                color: white;
                border-radius: 12rpx;
                background-color: $active-color;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>