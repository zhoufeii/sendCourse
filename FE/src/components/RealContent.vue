<template>
  <div>
      <!--<Button @click="sendAjax" type="info">发送请求</Button>-->
      <!--<h1 style="margin-bottom: 50px">总价 : {{totalPrice}}</h1>-->
      <!--<router-view name="viewA"></router-view>-->
      <!--<router-view name="viewB"></router-view>-->
      <router-view></router-view>
  </div>
</template>

<script>
  import { Content ,Button } from 'iview'
    export default {
      name: 'RealContent',
      data() {
          return {

          }
      },
      methods: {
        sendAjax(){
          this.axios({
            method: 'post',
            url: 'http://localhost:3000/saveSubject',
            data: {
              subject:'math'
            },
            headers: {"Conten-Type":"http://localhost:3000/saveSubject"},
          })
            .then((result)=>{
              console.log(result.data)
            })
            .catch((error)=>{
              console.log(error)
            })
        }
      },
      components: {
        Content,
        Button
      },
      computed:{
        totalPrice() {
          return this.$store.state.totalPrice
        }
      }

    }
</script>

<style>

</style>
