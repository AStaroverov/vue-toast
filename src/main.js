import Vue from 'vue'
import manager from './manager'

new Vue({
  el: '#app',
  ready() {
    console.log(this);
  },
  components: {
    'vue-toast': manager
  }
})
