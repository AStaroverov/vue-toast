import './style.css'
import template from './template.html'

const defaultOptions = {
  theme: 'default', // info warning error success
  timeLife: 5000,
  closeBtn: false,
}

export default {
  template: template,
  props: {
    message: {
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    destroyed: {
      twoWay: true,
      type: Boolean,
      required: true
    },
    options: {
      type: Object,
      coerce(options) {
        return Object.assign({}, defaultOptions, options)
      },
    },
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    theme() {
      return '_' + this.options.theme
    },
    style() {
      return `transform: translateY(${this.options.directionOfJumping}${this.position * 100}%)`
    }
  },
  ready() {
    setTimeout(() => {
      this.isShow = true
    }, 50)

    if (!this.options.closeBtn) {
      this._startLazyAutoDestroy()
    }
  },
  detached() {
    clearTimeout(this.timerDestroy)
  },
  methods: {
    // Public
    remove() {
      this._clearTimer()
      this.destroyed = true
      this.$remove().$destroy()

      return this
    },
    // Private
    _startLazyAutoDestroy() {
      this._clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.$remove().$destroy()
      }, this.options.timeLife)
    },
    _clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    },
    _startTimer() {
      if (!this.options.closeBtn) {
        this._startLazyAutoDestroy()
      }
    },
    _stopTimer() {
      if (!this.options.closeBtn) {
        this._clearTimer()
      }
    }
  }
}
