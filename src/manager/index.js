import './style.css'
import template from './template.html'
import vueToast from '../toast'

import {isNumber} from '../utils.js'

const defaultConst = {
  DELAY_JUMP: 30,
  MAX_COUNT: 6,
  POSITION: 'left bottom'
};

export default {
  template: template,
  data() { return {
    toasts: [],
    const: defaultConst
  }},
  computed: {
    classesOfPosition() {
      return this._updateClassesOfPosition(this.const.POSITION);
    },
    directionOfJumping() {
      return this._updateDirectionOfJumping(this.const.POSITION);
    }
  },
  methods: {
    // Public
    showToast(message) {
      this._pushToast(this._createToast(message));
      return this;
    },
    setOptions(options) {
      this.const = Object.assign(this.const, options);
      return this;
    },
    // Privet
    _createToast(message) {
      return new this.$options.components['vue-toast']({data: {
        message: message
      }});
    },
    _pushToast(toast) {
      const DELAY_JUMP = this.const.DELAY_JUMP > 0 ? this.const.DELAY_JUMP : 0;
      const MAX_COUNT = this.const.MAX_COUNT > 0 ? this.const.MAX_COUNT: 9999;

      // moving||removing old toasts
      this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        if (toast._isDestroyed) {
          return prev;
        }
        if (i+1 >= MAX_COUNT) {
          toast.remove();
          return prev;
        }

        setTimeout(() => {
          toast.translateY = `${this.directionOfJumping}${(i+1)*100}%`;
        }, i*DELAY_JUMP);
        prev.unshift(toast);

        return prev;
      }, []);

      // paste new toast
      setTimeout(() => {
        toast.$mount().$appendTo(this.$els.toasts);
      }, DELAY_JUMP);

      this.toasts.unshift(toast);
      return toast;
    },
    _updateClassesOfPosition(position) {
      return position.split(' ').reduce((prev, val) => {
        prev[`--${val.toLowerCase()}`] = true;
        return prev;
      }, {})
    },
    _updateDirectionOfJumping(position) {
      return position.match(/top/i) ? '+' : '-';
    }
  },
  components: {
    'vue-toast': vueToast
  }
}
