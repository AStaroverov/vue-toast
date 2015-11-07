import './style.css'
import template from './template.html'
import vueToast from '../toast'
import {_isNumber} from '../utils.js'
const defaultConst = {
  DELAY_JUMP: 30,
  MAX_COUNT: 6,
};

export default {
  template: template,
  data() { return {
    toasts: [],
    const: defaultConst
  }},
  components: {
    'vue-toast': vueToast
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
      const DELAY_JUMP = _isNumber(this.const.DELAY_JUMP) ?
      this.const.DELAY_JUMP :
      defaultConst.DELAY_JUMP;
      const MAX_COUNT = _isNumber(this.const.MAX_COUNT) && this.const.MAX_COUNT >= 1 ?
      this.const.MAX_COUNT :
      defaultConst.MAX_COUNT;

      this.toasts = this.toasts.reduceRight((prev, toast, i) => {
        if (toast._isDestroyed) {
          return prev;
        }
        if (i+1 >= MAX_COUNT) {
          toast.remove();
          return prev;
        }

        setTimeout(() => {
          toast.translateY = `-${(i+1)*100}%`;
        }, i*DELAY_JUMP);
        prev.unshift(toast);

        return prev;
      }, []);
      setTimeout(() => {
        toast.$mount().$appendTo(this.$els.toasts);
      }, DELAY_JUMP);

      this.toasts.unshift(toast);
      return toast;
    }
  }
}
