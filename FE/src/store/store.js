import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    totalPrice:0
  },
  mutations:{
    increment(state,price){
      state.totalPrice += price;
    },
    decrement(state,price){
      if(state.totalPrice - price < 0){
        alert('总价不可低于0')
        return false;
      }else{
        state.totalPrice -= price;
      }

    },
  }
})
