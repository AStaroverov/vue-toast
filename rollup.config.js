import { writeFileSync } from 'fs'
import buble from 'rollup-plugin-buble'
import vue from 'rollup-plugin-vue2'
import css from 'rollup-plugin-css-only'
import uglify from 'rollup-plugin-uglify'
import { renderSync } from 'node-sass'
import { minify } from 'csso'

const ENV = process.env.NODE_ENV
const MIN = 'min.'
const ENV_EXT = ENV === 'production' ? MIN : ''

const plugins = [
  vue({ autoStyles: false, styleToImport: true }),
  css({ output (sass) {
    const css = renderSync({ data: sass }).css.toString()
    const source = ENV === 'production' ? minify(css).css : css
    const path = `./dist/vue-toast.${ENV_EXT}css`

    writeFileSync(path, source)
  } }),
  buble(),
]

if (ENV === 'production') {
  plugins.push(uglify())
}

const dest = `./dist/vue-toast.${ENV_EXT}js`
const sourceMap = ENV !== 'production'

export default {
  entry: './src/main.js',
  moduleName: "vueToasts",
  format: 'umd',
  dest,
  plugins,
  sourceMap
}
