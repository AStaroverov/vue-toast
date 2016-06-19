# vue-toast

Toasts for vuejs.
How does it work? Look it [here](http://astaroverov.github.io/#!/example/vue-toast).

### Usage

Global
```
<link rel="stylesheet" href="./path/to/vue-toast.min.css" charset="utf-8">
<script src='./path/to/vue-toast.min.js'></script>
// it available in window.vueToast
```

Import:
```
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'


new Vue({
  template: '<div> <vue-toast v-ref="toast"></vue-toast> </div>',
  components: {
    VueToast: VueToast
  },
  ready() {
    const toast = this.$refs.toast
    
    toast.showToast('Show me toast')
    toast.showToast('Show me toast again!')
  }
})
```

### API

* showToast(string, {}) - main function that generates toast with some settings of instance toast and shows him.
* setOptions({}) - function for changing settings of component.

### Settings

Funcion <code>setOptions({})</code> lets to change settings of component.
* position {String} position of component | default: 'left bottom' | possible '[left, right] [top, bottom]'
* maxToasts {Number} max toasts number | default: 6

Funcion <code>showToast(string, {})</code> lets to change settings of current toast.
* theme {String} style for toast | default: default | possible: info warning error success
* timeLife {Number} time of life for current toast
* closeBtn {Boolean} turn off|on button for close toast and disabled|enabled "timeLife"

### Example

Look [here](https://github.com/AStaroverov/vue-toast/blob/master/index.html).
