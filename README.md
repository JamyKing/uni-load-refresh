# load-refresh

### uni-app 组件封装---局部下拉刷新、上划加载更多

**注意**： *此组件基于uni-app前端框架，可以在uni-app中直接使用，原生或者其他框架可能需要代码进行一些修改，但是组件的业务逻辑是不变的。*
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
  :heightReduce="10"
  :backgroundCover="'#F3F5F5'"
  :pageNo="currPage"
  :totalPageNo="totalPage" 
  @loadMore="loadMore" 
  @refresh="refresh">
  <view slot="content-list">
    <!-- 数据列表 -->
  </view>
</load-refresh>
```

#### 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| heightReduce | Number | 0 | 裁剪高度(在整个屏幕高度中除该组件外，其余部分占据的高度) |
| backgroundCover | String | white | 数据列表块背景色 |
| pageNo | Number | 0 | 当前页码 |
| totalPageNo | Number | 0 | 总页数 |

#### 事件说明

| 事件名 | 说明 | 返回值 |
| ------ | ------ | ------ |
| @loadMore | 加载更多 |  |
| @refresh | 数据列表刷新 |  |

#### 注意事项

  - 单次触发loadMore后，使用 `this.$refs.loadRefresh.loadOver()` 来结束本次加载更多。
  - 如果对您有帮助，请鼓励支持一下，[Star](https://github.com/iRainy6661/uni-load-refresh)。

#### demo用例

```
<template>
  <view class="content">
    <load-refresh
      ref="loadRefresh"
      :heightReduce="10"
      :backgroundCover="'#FFFFFF'"
      :pageNo="currPage"
      :totalPageNo="totalPage" 
      @loadMore="loadMore" 
      @refresh="refresh">
      <view slot="content-list">
        <!-- 数据列表 -->
        <view class="dataList" v-for="(item,index) in list" :key="index">
					
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
        totalPage: 1 // 总页数
      }
    },
    methods: {
      // 上划加载更多
      loadMore() {
        console.log('loadMore')
        // 请求新数据完成后调用 组件内loadOver()方法
        // 注意更新当前页码 currPage
        this.$refs.loadRefresh.loadOver()
      },
      // 下拉刷新数据列表
      refresh() {
        console.log('refresh')
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
