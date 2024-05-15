export default defineBackground(() => {
  browser.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
    console.log('Received message', req, sender, sendResponse)

    const url = `https://dict.youdao.com/w/eng/${req.word}`
    try {
      return query(url)
    }
    catch (e) {
      //
    }
  })
})

async function query(url: string) {
  try {
    const response = fetch(url, { mode: 'no-cors' })
    return (await response).text()
  }
  catch (e) {
    //
  }
}
