import { checking } from './util/collins'

export default defineContentScript({
  matches: ['https://web.shanbay.com/wordsweb/*'],

  main() {
    checking()
  },
})
