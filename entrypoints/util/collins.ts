import type { App } from 'vue'
import { createApp } from 'vue'
import Collins from '@/components/Collins.vue'

export function checking() {
  let isMounted = false
  // @ts-expect-error app instance
  let app: App = null
  setInterval(() => {
    console.log('checking')
    const container = document.querySelector('div[class^=\'CollinsTrans_container\']')
    if (isMounted) {
      if (container == null) {
        app?.unmount()
        isMounted = false
      }
      return
    }
    if (container != null) {
      // 并且collins到期了
      if (container.textContent?.startsWith('你的柯林斯词典到期')) {
        app = createApp(Collins)
        app.mount(container)
        isMounted = true
      }
    }
    else {
      console.log('not mounted')
      app?.unmount()
      isMounted = false
    }
  }, 1000)
}
