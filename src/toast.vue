<template>
  <transition>
    <div class="vue-toast_container"
         @mouseover="_stopTimer"
         @mouseleave="_startTimer"
         :style="style"
         :class="[theme]"
         v-show="isShow">
      <div class="vue-toast_message">
        <span v-html="message"></span>
        <span class="vue-toast_close-btn"
              v-if="mergedOptions.closeBtn"
              @click="remove">
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
const defaultOptions = {
  theme: 'default', // info warning error success
  timeLife: 5000,
  closeBtn: false,
  forceDestroy: false
}

export default {
  props: {
    message: {
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    options: {
      type: Object
    },
  },
  data() {
    return {
      isShow: false,
      destroyed: false
    }
  },
  computed: {
    mergedOptions () {
      return Object.assign({}, defaultOptions, this.options)
    },
    theme () {
      return '_' + this.mergedOptions.theme
    },
    style () {
      return { transform: `translateY(${this.mergedOptions.directionOfJumping}${this.position * 100}%)` }
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isShow = true
      }, 50)

      if (!this.mergedOptions.closeBtn || this.mergedOptions.forceDestroy) {
        this._startLazyAutoDestroy()
      }
    })
  },
  destroyed () {
    this.$nextTick(() => {
      clearTimeout(this.timerDestroy)
    })
  },
  methods: {
    // Public
    remove () {
      this._clearTimer()
      this.destroyed = true
      this.$emit('destroyed')
      this.$el.remove()

      return this
    },
    // Private
    _startLazyAutoDestroy () {
      this._clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.$el.remove()
        this.destroyed = true
        this.$emit('destroyed')
      }, this.mergedOptions.timeLife)
    },
    _clearTimer () {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    },
    _startTimer () {
      if (!this.mergedOptions.closeBtn) {
        this._startLazyAutoDestroy()
      }
    },
    _stopTimer () {
      if (!this.mergedOptions.closeBtn) {
        this._clearTimer()
      }
    }
  }
}
</script>

<style lang="sass">
  .vue-toast_container {
    position: absolute;
    padding-bottom: 10px;
    transform: translateY(0);
    transition: transform .2s ease-out, opacity .3s ease-out;
    backface-visibility: hidden;

    &._default .vue-toast_message {
      background-color: rgba(#000, .9);
    }
    &._info .vue-toast_message {
      background-color: rgba(#31708f, .9);
    }
    &._success .vue-toast_message {
      background-color:  rgba(#3c763d, .9);
    }
    &._warning .vue-toast_message {
      background-color:  rgba(#8a6d3b, .9);
    }
    &._error .vue-toast_message {
      background-color:  rgba(#a94442, .9);
    }

  }


  .vue-toast-manager_container {
    &.--top .vue-toast_container {
      top: 0;
    }
    &.--bottom .vue-toast_container {
      bottom: 0;
    }
    &.--left .vue-toast_container {
      left: 0;
    }
    &.--right .vue-toast_container {
      right: 0;
    }
  }

  .vue-toast_container.v-enter,
  .vue-toast_container.v-leave-active {
    opacity: 0;
  }

  .vue-toast_message {
    padding: 15px 22px 15px 10px;
    color: white;
    font-family: arial, sans-serif;
  }

  .vue-toast_close-btn {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    width: 14px;
    height: 14px;
    opacity: .7;
    transition: opacity .15s ease-in-out;
    backface-visibility: hidden;

    &:hover {
      opacity: .9;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 6px;
      width: 14px;
      height: 2px;
      background-color: white;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
</style>
