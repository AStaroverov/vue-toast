<style src="./style.css"></style>

<template>
  <transition name="vue-toast-opacity">
    <div
      class='vue-toast_container'
      @mouseover='_stopTimer'
      @mouseleave='_startTimer'
      :style='style'
      :class='[theme]'
    >
      <component v-if='component' :is='component' @remove='remove'></component>
      <div v-else class='vue-toast_message'>
        <span v-html='message'></span>
        <span
          v-if='options.closeBtn'
          class='vue-toast_close-btn'
          @click='remove'
        />
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
}

export default {
  props: {
    component: {},
    message: {},
    position: {
      type: Number,
      required: true
    },
    onDestroy: {
      required: true,
      type: Function
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    theme() {
      return this.options.theme ? '_' + this.options.theme : ''
    },
    style() {
      return `transform: translateY(${this.options.directionOfJumping}${this.position * 100}%)`
    },
    fullOptions() {
      return Object.assign({}, defaultOptions, this.options)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 50)

    if (this._canSetDestroyer()) {
      this._startLazyAutoDestroy()
    }
  },
  methods: {
    // Public
    remove() {
      this._clearTimer()
      this.onDestroy()
    },
    // Private
    _canSetDestroyer () {
      return Number(this.fullOptions.timeLife) > 0;
    },
    _startLazyAutoDestroy() {
      this._clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.remove()
      }, this.fullOptions.timeLife)
    },
    _clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    },
    _startTimer() {
      if (this._canSetDestroyer()) {
        this._startLazyAutoDestroy()
      }
    },
    _stopTimer() {
      if (this._canSetDestroyer()) {
        this._clearTimer()
      }
    }
  }
}
</script>
