# sofar-picker

   - 日期范围选择，颗粒度为`年-月`，支持`至今`选项。
   - 根据实际开发需求完成，分享出来希望有帮助。
   - 最新的项目示例代码可在[GitHub](https://github.com/JamyKing/uni-load-refresh)获取。

## 使用方法

#### 在 `script` 中引用组件

```
import sofarPicker from '@/components/sofar-picker/sofar-picker.vue'
export default {
  components: {
    sofarPicker
  }
}
```

#### 在 `template` 中使用组件

```
<sofar-picker
  :visable.sync="pickerVisable"
  :defaultDate="defaultDate"
  :minYear="1990"
  separator="."
  themeColor="#10BE9D"
  startText="开始时间"
  endText="结束时间"
  @confirm="confirm">
</sofar-picker>
```

#### Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| visable | Boolean | false | 日期选择控件的显示/隐藏，注意使用`.sync`修饰符(true: 显示; false: 隐藏) |
| defaultDate | Array | [] | 默认预设值 |
| minYear | Number | 1990 | 最小年份 |
| separator | String | `.` | 时间格式分隔符(例如：`-`、`/`) |
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
    <sofar-picker
      :visable.sync="pickerVisable"
      :defaultDate="defaultDate"
      @confirm="confirm">
    </sofar-picker>
  </view>
</template>

<script>
  import sofarPicker from '@/components/sofar-picker/sofar-picker.vue'
  export default {
    components: {
      sofarPicker
    },
    data() {
      return {
        pickerVisable: false,
        defaultDate: ['2020.1', '至今']
      }
    },
    methods: {
      // 打开日期选择框
      openPicker() {
        this.pickerVisable = true
      },
      // 点击确定按钮，返回当前选择的值
      confirm(date) {
        console.log(date) // ['2020.6', '至今']
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
