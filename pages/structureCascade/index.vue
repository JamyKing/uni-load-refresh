<template>
    <view>
        <structure-cascade
          ref="strCascade"
          v-model="results"
          valueField="deptId"
          labelField="name"
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
                        "deptId": "1",
                        "parentId": "0",
                        "name": "一级_1",
                        "children": [
                            {
                                "deptId": "2",
                                "parentId": "1",
                                "name": "二级_1-1",
                                "children": [
                                    {
                                        "deptId": "3",
                                        "parentId": "2",
                                        "name": "三级_1-1-1",
                                        "children": [
                                            {
                                                "deptId": "4",
                                                "parentId": "3",
                                                "name": "四级_1-1-1-1"
                                            }
                                        ]
                                    },
                                    {
                                        "deptId": "5",
                                        "parentId": "2",
                                        "name": "三级_1-1-2",
                                        "children": [
                                            {
                                                "deptId": "6",
                                                "parentId": "5",
                                                "name": "四级_1-1-2-1"
                                            },
                                            {
                                                "deptId": "7",
                                                "parentId": "5",
                                                "name": "四级_1-1-2-2",
                                                "children": [
                                                    {
                                                        "deptId": "8",
                                                        "parentId": "7",
                                                        "name": "五级1-1-2-2-1"
                                                    },
                                                    {
                                                        "deptId": "9",
                                                        "parentId": "7",
                                                        "name": "五级1-1-2-2-2"
                                                    },
                                                    {
                                                        "deptId": "10",
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
                results: []
            }
        },
        onLoad() {
            this.initData()
        },
        computed: {

        },
        methods: {
            initData() {
                // this.$refs.structureCascade.getList()
                // console.log(this.getAllParentNode(this.treeData, '4'))
                // console.log(this.getParentIds(this.treeData, {deptId: '4'}))
                // console.log(this.getAllChidlren(this.treeData))
            },
            getAllChidlren(data) {
                var result = [];
                var fn = function (data) {
            	   if (Array.isArray(data)) { // 判断是否是数组并且没有的情况下，
            	      data.forEach(item => {
            	        if (item.name.includes('五级')) { // 数据循环每个子项，并且判断子项下边是否有id值
            	           result.push(item); // 返回的结果等于每一项
            	        } else if (item.children) {
            	           fn(item.children); // 递归调用下边的子项
            	        }
            	      })
            	    }
                }
                fn(data); // 调用一下
                return result;
            },
            getParentIds(tree, aim){
                let temp = []//结果对象
                let forFn = function (arr, key) {
                    for (let i = 0; i < arr.length; i++) {
                        let item = arr[i]
                        if (item.deptId === key) {
                            forFn(tree, item.parentId)
                            if (item.deptId !== aim.deptId) {
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
                forFn(tree, aim.deptId)
                return temp
            },
            // 获取给定节点的父亲节点
            getParentNode(data, key) {
              for (let i = 0; i < data.length; i++) {
                if (data[i].children?.length) {
                  if (data[i].children.some((item) => item.deptId === key)) {
                    return data[i]
                  } else {
                    const temp = this.getParentNode(data[i].children, key)
                    if (temp) return temp
                  }
                }
              }
              return null
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>