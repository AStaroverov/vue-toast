# vue-toast

Toasts for vuejs.
How does it work? Look it [here](http://astaroverov.github.io/).

### Usage

commonJS:
```
impot vueToast from 'vue-toast'
Vue.component('vue-toast', vueToast);
```

GLobal
```
<script src='./path/to/vue-toast.js'></script>
<script>
  Vue.component('vue-toast', window.vueToast);
</script>
```

### API

* showToast(string) - main function that generates toast and shows him.
* setOptions({}) - function for changing settings.

### Settings

Funcion <code>setOptions({})</code> lets to change settings.
* DELAY_JUMP {integer} delay moving toasts | default: 30
* MAX_COUNT {integer} max toasts number | default: 6

### Example

Look [here](https://github.com/AStaroverov/vue-toast/blob/master/index.html).


