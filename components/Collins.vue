<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { isEmpty } from 'lodash-es'

interface Explains {
  mean: string
  p1: Element
  p2: Element
}
const explainList = ref<Explains[]>([])
function parseData(res: string) {
  if (isEmpty(res))
    return

  const parser = new DOMParser()
  const doc = parser.parseFromString(res, 'text/html')
  const nodes = doc.querySelectorAll('#collinsResult .wt-container ul>li')
  const fn = [].map.bind(nodes, (it: Element) => ({
    mean: it.querySelector('.collinsMajorTrans>p')?.outerHTML.replaceAll(/\t+/g, ''),
    p1: it.querySelector('.examples p:first-child')?.textContent,
    p2: it.querySelector('.examples p:last-child')?.textContent,
  }))
  const data = fn() as Explains[]
  explainList.value = data.filter(it2 => !isEmpty(it2.mean))
}
function onQuery() {
  const wordElement = document.querySelector('div[class^="VocabPronounce_word"]')
  if (wordElement == null)
    return
  const word = wordElement.textContent
  browser.runtime.sendMessage(null, { action: 'collins', word }).then((res: string) => {
    console.log('collins res', res)
    parseData(res)
  })
}
onMounted(() => {
  console.log('collins mounted')
  onQuery()
})
</script>

<template>
  <div class="collins-trans">
    <div v-for="(explain, index) in explainList" :key="index" class="mean-container">
      <div class="mean">
        <span style="margin-right: 4px;">{{ `${index + 1}. ` }}</span>
        <span class="mean-text" v-html="explain.mean" />
      </div>
      <div v-if="explain.p1 && explain.p2" class="examples">
        <p>例: {{ explain.p1 }}</p>
        <p>{{ explain.p2 }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mean-container {
  text-align: left;
  &:not(:first-child) {
      margin-top: 15px;
  }
}
.mean{
  display: inline-flex;
}
.mean-text {
  :deep(p) {
    text-align: left;
  }
  :deep(b) {
    color: #28bea0;
  }
}
.examples {
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: lighten(#b0b4be, 20%);
}
.collins-trans {
  p {
      text-align: left;
  }
}
</style>
