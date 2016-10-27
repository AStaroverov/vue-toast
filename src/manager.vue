<template>
  <div class="vue-toast-manager_container" :class="classesOfPosition">
    <vue-toast
        v-for="(toast, index) in toasts"
        :message="toast.message"
        :options="toast.options"
        :position="index"
        @destroyed="_onDestroyed(toast)"
      ></vue-toast>
  </div>
</template>

<script>
import vueToast from './toast.vue'
import {isNumber, isObject} from './utils.js'

const defaultOptions = {
  maxToasts: 6,
  position: 'right bottom'
}

export default {
  data() {
    return {
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
    showToast(message, options) {
      options = Object.assign(this.options, options || {})
      this._addToast(message, options)
      this._moveToast()

      return this
    },
    setOptions(options) {
      if (isObject(option)) {
        this.options = Object.assign({}, this.options, option)
      }
      return this
    },
    // Private
    _onDestroyed (toast) {
      toast.isDestroyed = true
    },
    _addToast(message, options = {}) {
      if (!message) {
        return
      }

      options.directionOfJumping = this.directionOfJumping

      this.toasts.unshift({
        message,
        options
      })
    },
    _moveToast(toast) {
      const maxToasts = this.options.maxToasts > 0
        ? this.options.maxToasts
        : 9999

      // moving||removing old toasts
      this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        if (toast.isDestroyed) {
          return prev
        }

        if (i + 1 >= maxToasts) {
          return prev
        }

        return [toast].concat(prev)
      }, [])
    },
    _updateClassesOfPosition(position) {
      return position.split(' ').reduce((prev, val) => {
        prev[`--${val.toLowerCase()}`] = true

        return prev
      }, {})
    },
    _updateDirectionOfJumping(position) {
      return position.match(/top/i) ? '+' : '-'
    }
  },
  components: {
    vueToast
  }
}
</script>

<style lang="sass">
  .vue-toast-manager_container {
    position: fixed;
    width: 100%;

    &.--top {
      top: 10px;
    }
    &.--bottom {
      bottom: 10px;
    }
    &.--left {
      left: 10px;
    }
    &.--right {
      right: 10px;
    }
  }

  .vue-toast-manager_toasts {
    position: relative;
  }
</style>
