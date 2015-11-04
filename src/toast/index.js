import './style.css'
import template from './template.html'

export default {
  template: template,
  data() {return {
    message: '',
    translateY: '-0%',
    isShow: false,
    const: {
      TIME_LIFE: 5000,
    }
  }},
  computed: {
    style() {
      return `transform: translateY(${this.translateY})`
    }
  },
  ready() {
    setTimeout(() => {
      this.isShow = true;
    }, 150);
    this._startLazyAutoDestroy();
  },
  methods: {
    // Public
    remove() {
      this._clearTimer();
      this.$remove().$destroy();

      return this;
    },
    // Privet
    _startLazyAutoDestroy() {
      this._clearTimer();
      this.timerDestroy = setTimeout(() => {
        this.$remove().$destroy();
      }, this.const.TIME_LIFE);
    },
    _clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy);
      }
    },
    _startTimer() {
      this._startLazyAutoDestroy();
    },
    _stopTimer() {
      this._clearTimer();
    }
  }
}
