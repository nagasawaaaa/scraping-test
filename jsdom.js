const request = require('request')
const { JSDOM } = require('jsdom')
const moment = require('moment')
const fs = require('fs')  // ファイル操作に必要なモジュール（Node.jsにデフォで入っているはずなので npm i しなくて良い）

const today = moment().format('YYYY-MM-DD') // ファイル名に使用する日付フォーマット
const url = 'https://news.yahoo.co.jp/categories/it' // YahooニュースのITカテゴリTOP

request(url, (e, response, body) => {
  if (e) {
    console.error(e)
  }

  try {
    // 取得してきたニュースをのテキストを格納する変数
    let text = ''

    // リクエストで返ってきたDOM
    const dom = new JSDOM(body)

    // トピックリストのDOMを取得
    const topicsListItem = dom.window.document.querySelectorAll('.topicsListItem')

    // querySelectorAllの返り値はNodeListなのでforEachで回す
    topicsListItem.forEach(element => {
      const item = element.children[0] // 各ニュースを取得
      const news = {
        text: item.textContent.trim(), // ニュースのテキスト
        href: item.href  // ニュースのリンク先
      }

      // テキストとリンク先を結合し、文末に改行を入れる
      text += `${news.text} ${news.href}\n`
    })
    
    // YYYY-MM-DD_it_news.txt を作成し、テキストとリンクをファイルに書き込む
    fs.writeFileSync(`${today}_it_news.txt`, text)
  } catch (e) {
    console.error(e)
  }
})
