<template>
    <div style="margin-bottom: 50px">
      <h3 style="margin-bottom: 20px">i want {{count}} apple , i need to pay {{ getApplePrice }} Pounds.</h3>
      <Button type="success" @click="addApple">加苹果</Button>
      <Button type="warning" @click="minusApple">减苹果</Button>
    </div>
</template>

<script>
  import { Button } from 'iview'
    export default {
        name: '',
        data() {
            return {
              count:0,
              price:15,

            }
        },
        methods: {
          addApple(){
            this.count++;
            this.$store.commit('increment',this.price)
          },
          minusApple(){
            this.count--;
            if(this.count < 0 ){
              this.count = 0;
              alert('你没有买苹果!');
              return false;
            }
            this.$store.commit('decrement',this.price)
          }
        },
        components: {
          Button
        },
        computed:{
          getApplePrice(){
            return this.price * this.count;
          }
        }
    }
</script>

<style>

</style>
