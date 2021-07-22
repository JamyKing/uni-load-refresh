# term-picker

   - 日期范围选择，颗粒度为`年-月-日`。
   - 也是根据开发需求去借鉴其他代码后完成的，分享出来希望有帮助。
   - 最新的项目示例代码可在[GitHub](https://github.com/iRainy6661/uni-load-refresh)获取。

## 使用方法

#### 在 `script` 中引用组件

```
import sofarPicker from '@/components/term-picker/term-picker.vue'
export default {
  components: {
    sofarPicker
  }
}
```

#### 在 `template` 中使用组件

```
<term-picker
  :visable.sync="pickerVisable"
  :defaultDate="defaultDate"
  :minYear="1990"
  themeColor="#10BE9D"
  startText="开始时间"
  endText="结束时间"
  @confirm="confirm">
</term-picker>
```

#### Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| visable | Boolean | false | 日期选择控件的显示/隐藏，注意使用`.sync`修饰符(true: 显示; false: 隐藏) |
| defaultDate | Array | [] | 默认预设值 |
| minYear | Number | 1990 | 最小年份 |
| themeColor | String | #10BE9D | 选择框操作栏部分字体颜色 |
| startText | String | 开始时间 | 日期范围起始处文本 |
| endText | String | 结束时间 | 日期范围结束处文本 |

#### Events 事件说明

| 事件名 | 说明 | 返回值 |
| ------ | ------ | ------ |
| @confirm | 点击确定按钮，返回当前选择的值 | `Array`数组类型 |

#### Demo 代码示例

```
<template>
  <view class="content">
    <term-picker
      :visable.sync="pickerVisable"
      :defaultDate="defaultDate"
      @confirm="confirm">
    </term-picker>
  </view>
</template>

<script>
  import sofarPicker from '@/components/term-picker/term-picker.vue'
  export default {
    components: {
      sofarPicker
    },
    data() {
      return {
        pickerVisable: false,
        defaultDate: ['2020-01-01', '2021-01-01']
      }
    },
    methods: {
      // 打开日期选择框
      openPicker() {
        this.pickerVisable = true
      },
      // 点击确定按钮，返回当前选择的值
      confirm(date) {
        console.log(date) // ['2021-06-01', '2021-07-01']
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
