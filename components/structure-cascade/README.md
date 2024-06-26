# structure-cascade

   - 树形结构数据选择组件。
   - 适用于一些多级部门、组织架构类的数据选择。
   - 根据实际开发需求整理出来的，有需要的可以进行二次开发。
   - 最新的项目示例代码可在[GitHub](https://github.com/JamyKing/uni-load-refresh)获取。

## 使用方法

#### 在 `script` 中引用组件

```
import structureCascade from '@/components/structure-cascade/structure-cascade.vue'
export default {
  components: {
    structureCascade
  }
}
```

#### 在 `template` 中使用组件

```
<structure-cascade
    ref="strCascade"
    v-model="strResults"
    topTitle="组织架构"
    valueField="id"
    labelField="name"
    :checkIcon="require('@/static/icons/icon_gou.png')"
    :moreIcon="require('@/static/icons/ico_more@2x.png')"
    :treeData="treeData">
</structure-cascade>
```

#### Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| value / v-model | Array | [] | 绑定值 |
| topTitle | String | 组织架构 | 头部顶级索引名称 |
| treeData | Array | [] | 树形结构数据（参考如下Demo） |
| isRadio | Boolean | true | 是否为单选 |
| selectMax | Number | 0 | 多选时最大选择数，仅在`isRadio`为`false`时生效(0: 不限) |
| valueField | String | id | 自定义`value`属性名 |
| labelField | String | name | 自定义`label`属性名 |
| checkIcon | String | '' | 数据勾选时的icon展示 |
| moreIcon | String | '' | 当前节点存在字节点时的icon展示 |

#### Methods 组件内方法

| 方法名 | 说明 | 参数 | 使用 |
| ------ | ------ | ------ | ------ |
| getFilterData(keyword, treeData) | 根据关键词模糊查询，返回一维数组格式的节点集 | `keyword`：关键词，对应各节点的`labelField`字段。 `treeData`：树形结构数据(不传则默认为`treeData`) | this.$refs.strCascade.getFilterData('一级') |

#### Notes 注意事项

  - 该组件尚不支持父子节点联动选中。
  - 图片路径请使用`require`，例如：`:checkIcon="require('@/static/icons/icon_gou.png')"`。
  - 设置默认值选中时，需要`valueField`和`labelField`两个属性参数。
  - 树形结构数据中子节点需要有`parentId`属性参数，有默认值选中时回显需要使用到。
  - 如果对您有帮助，请鼓励支持一下，[![GitHub stars](https://img.shields.io/github/stars/JamyKing/uni-load-refresh?style=falt)](https://github.com/JamyKing/uni-load-refresh)。

#### Demo 代码示例

```
<template>
  <view>
    <structure-cascade
      ref="strCascade"
      v-model="strResults"
      topTitle="组织架构"
      valueField="id"
      labelField="name"
      :checkIcon="require('@/static/icons/icon_gou.png')"
      :moreIcon="require('@/static/icons/ico_more@2x.png')"
      :treeData="treeData">
    </structure-cascade>
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
            id: 1,
            name: '一级_1',
            children: [
              {
                id: 2,
                name: '二级_1-1',
                parentId: 1
              },
              {
                id: 3,
                name: '二级_1-2',
                parentId: 1
              }
            ]
          }
        ], // 树形结构
        strResults: [
          {
            id: 3,
            name: '二级_1-2'
          }
        ] // 默认选中回显
      }
    }
  }
</script>
```
