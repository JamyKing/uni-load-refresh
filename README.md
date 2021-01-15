# load-refresh

### uni-app 组件封装---局部下拉刷新、上划加载更多

**注意**： *此组件基于uni-app前端框架，可以在uni-app中直接使用。*
  - 可以在App、H5端、微信小程序完美运行。
  - 刷新动画使用了[Epic Spinners](https://epic-spinners.epicmax.co/)，也可以根据情况自定义。
  - 组件的状态文字提醒，也可根据自身需求进行修改。
  - **更多详情请访问 uni-app [插件市场](https://ext.dcloud.net.cn/plugin?id=1866)。**

## 项目运行

  - clone项目到本地

```sh
    git clone git@github.com:iRainy6661/uni-load-refresh.git
```

  - 使用HBuilderX导入项目
  - 运行到浏览器（H5端）、微信小程序端、App端等
  
#### 以H5运行结果为例：
![refresh](http://www.jianking.vip/images/refresh.png) ![loadMore](http://www.jianking.vip/images/loadMore.png) ![scrollEnd](http://www.jianking.vip/images/scrollEnd.png)

## load-refresh 组件使用

#### 在 `script` 中引用组件

```
import loadRefresh from '@/components/load-refresh/load-refresh.vue'
export default {
  components: {
    loadRefresh
  }
}
```

#### 在 `template` 中使用组件

```
<load-refresh
  ref="loadRefresh"
  :isRefresh="true"
  refreshType="hollowDots"
  color="#04C4C4"
  heightReduce="0"
  backgroundCover="#F3F5F5"
  :pageNo="currPage"
  :totalPageNo="totalPage" 
  @loadMore="loadMore" 
  @refresh="refresh">
  <view slot="content-list">
    <!-- 数据列表 -->
  </view>
</load-refresh>
```

#### Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| isRefresh | Boolean | true | 是否开启手势下拉刷新功能(true: 开启; false: 关闭) |
| refreshType | String | hollowDots | 刷新动画，可选类型参数(hollowDots, halfCircle, swappingSquares) |
| color | String | #F3F5F5 | 自定义动画颜色 |
| heightReduce | String | 0 | 裁剪高度(在整个屏幕高度中除该组件外，其余部分占据的高度，单位：rpx) |
| backgroundCover | String | white | 数据列表块背景色 |
| pageNo | Number | 0 | 当前页码 |
| totalPageNo | Number | 0 | 总页数 |

#### Events 事件说明

| 事件名 | 说明 | 返回值 |
| ------ | ------ | ------ |
| @loadMore | 上滑加载更多 |  |
| @refresh | 下拉列表刷新 |  |

#### Methods 组件内方法

| 方法名 | 说明 | 使用 |
| ------ | ------ | ------ |
| completed() | 刷新、加载完成(下拉刷新、加载更多 数据更新成功后必须调用) | this.$refs.loadRefresh.completed() |
| runRefresh() | 代码内触发下拉刷新 | this.$refs.loadRefresh.runRefresh() |

#### Notes 注意事项

  - 注意将数据集放在插槽`slot="content-list"`中。
  - 加载更多`loadMore()`过程中，建议在请求时使用`currPage + 1`形式，成功后的**回调函数中**去更新`currPage`的值。
  - **`@loadMore`、`@refresh`触发后，在数据请求成功后，必须调用`completed()`去结束动画。**
  - 如有需要使用组件实现`tabsSwiper`**全屏选项卡**功能，可参考[tabsSwiper](https://github.com/iRainy6661/uni-load-refresh/blob/master/pages/tabs/tabs.vue)。
  - 使用出现问题可参考[常见问题汇总](https://github.com/iRainy6661/uni-load-refresh/issues/2)
  - 如果对您有帮助，请鼓励支持一下，[![GitHub stars](https://img.shields.io/github/stars/iRainy6661/uni-load-refresh?style=falt)](https://github.com/iRainy6661/uni-load-refresh)。

#### Demo 代码示例

```
<template>
  <view class="content">
    <load-refresh
      ref="loadRefresh"
      :isRefresh="true"
      :pageNo="currPage"
      :totalPageNo="totalPage" 
      @loadMore="loadMore" 
      @refresh="refresh">
      <view slot="content-list">
        <!-- 数据列表 -->
        <view class="dataList" v-for="(item,index) in list" :key="index">
          {{item}}
        </view>
      </view>
    </load-refresh>
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
        list: [], // 数据集
        currPage: 1, // 当前页码
        totalPage: 2 // 总页数
      }
    },
    methods: {
      // 上划加载更多
      loadMore() {
        // 模拟请求成功后的回调
        setTimeout(() => {
          // 1. list数组添加新数据
          // 2. 更新当前页码 currPage
          // 3. 调用completed()方法 this.$refs.loadRefresh.completed()
        }, 800)
      },
      // 下拉刷新数据列表
      refresh() {
        // 模拟请求成功后的回调
        setTimeout(() => {
          // 1. list重新赋值，应避免 this.list = [] 这种操作
          // 2. 更新当前页码 currPage
          // 3. 调用completed()方法 this.$refs.loadRefresh.completed()
        }, 1600)
      },
      // 后期可将loadMore()与refresh()合并成一个函数方法去处理，因为本质上这两个方法只有在list赋值上面有不同
      // 代码触发下拉刷新方法
      runRefresh() {
        this.$refs.loadRefresh.runRefresh()
      }
    }
  }
</script>

<style>
  .content{
    width: 100%;
    height: 100%;
  }
</style>
```
