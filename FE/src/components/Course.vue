<template>
    <div>
      <p>this is the {{ course }}</p>
      <input type="text" name="" v-focus v-model="course" @keyup.enter="changeParams"/>
      <router-view name="viewA"></router-view>
      <router-view name="viewB"></router-view>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
              course:'math'
            }
        },
        methods: {
          changeParams(){
            console.log('send : '+this.course)
            this.$emit('input-course',this.course)
          }
        },
        components: {},

        // 自定义指令
        directives:{
          focus:{
            // 指令的定义 , 有 5 个钩子函数
            bind(){
              // 只调用一次，指令第一次绑定到元素时调用
              console.log('bind')
            },
            inserted(el,binding){
              // inserted : 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
              // el : 使用这个指令的元素
              // binding : 一个对象, 主要包括以下属性 { name(指令名), value(指令的绑定值), oldValue(指令绑定的前一个值) }
              console.log('inserted')
              el.focus();
            },
            update(){
              // 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值
              console.log('update')
            }

          }
        }
    }
</script>

<style>

</style>
