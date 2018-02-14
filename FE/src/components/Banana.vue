<template>
    <div>
      <h3 style="margin-bottom: 20px">i want {{ count }} banana , i need to pay {{ getBananaPrice }} Pounds.</h3>
      <Button type="success" @click="addBanana">加香蕉</Button>
      <Button type="warning" @click="minusBanana">减香蕉</Button>
    </div>
</template>

<script>
  import { Button } from 'iview'
    export default {
        name: '',
        data() {
            return {
              count:0,
              price:20,
            }
        },
        methods: {
          addBanana(){
            this.count++;
            this.$store.commit('increment',this.price)
          },
          minusBanana(){
            this.count--;
            if(this.count < 0 ){
              this.count = 0;
              alert('你没有买香蕉!');
              return false;
            }
            this.$store.commit('decrement',this.price)
          }
        },
        components: {
          Button
        },
        computed:{
          getBananaPrice(){
            return this.price * this.count;
          }
        }
    }
</script>

<style>

</style>
