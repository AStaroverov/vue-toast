<style src='./style.css'></style>

<template>
  <transition-group
    tag='div'
    name='vue-toast'
    class='vue-toast-manager_container'
    :class='classesOfPosition'
  >
    <vue-toast
      v-for='(toast, index) in toasts'
      :key='toast.uid'
      :message='toast.message'
      :component='toast.component'
      :options='toast.options'
      :onDestroy='toast.onDestroy'
      :position='index'
    ></vue-toast>
  </transition-group>
</template>

<script>
import VueToast from '../toast/index.vue'

const defaultOptions = {
  maxToasts: 6,
  position: 'left bottom'
}

export default {
  data() {
    return {
      uid: 1,
      toasts: [],
      options: defaultOptions
    }
  },
  computed: {
    classesOfPosition() {
      return this._updateClassesOfPosition(this.options.position)
    },
    directionOfJumping() {
      return this._updateDirectionOfJumping(this.options.position)
    }
  },
  methods: {
    // Public
    showToast(messageOrComponent, options) {
      this._addToast(messageOrComponent, options)
      this._moveToast()

      return this
    },
    setOptions(options) {
      this.options = Object.assign(this.options, options || {})

      return this
    },
    closeAll() {
      this.toasts = []
    },
    // Private
    _addToast(messageOrComponent, options = {}) {
      if (!messageOrComponent) {
        return
      }

      options.directionOfJumping = this.directionOfJumping

      const that = this
      const uid = this.uid++
      const toast = {
        uid,
        options,
        onDestroy() {
          const i = that.toasts.findIndex(item => item.uid === uid)
          that.toasts.splice(i, 1)
        }
      }

      if (typeof messageOrComponent === 'function') {
        toast.component = messageOrComponent;
      } else {
        toast.message = messageOrComponent;
      }

      this.toasts.unshift(toast)
    },
    _moveToast(toast) {
      const maxToasts = this.options.maxToasts > 0
        ? this.options.maxToasts
        : 9999

      this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        if (i + 1 >= maxToasts) {
          return prev
        }

        return [toast].concat(prev)
      }, [])
    },
    _updateClassesOfPosition(position) {
      return position.split(' ').reduce((prev, val) => {
        prev[`__${val.toLowerCase()}`] = true

        return prev
      }, {})
    },
    _updateDirectionOfJumping(position) {
      return position.match(/top/i) ? '+' : '-'
    }
  },
  components: { VueToast }
}
</script>
