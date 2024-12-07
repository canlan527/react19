import { Suspense, use, useState } from "react"

// 接口请求
function fecthSearchData(keyword) {
  // 取消请求
  const controller = new AbortController()
  // 请求接口
  const promise = fetch(`http://localhost:3300/search?keyword=${keyword}`, {
    signal: controller.signal
  })
    .then(res => res.json())
    .catch(err => ['请稍后再来...'])

  // 取消请求控制器传给promise
  promise.controller = controller
  return promise
}

function SearchResult({ promise }) {
  const results = use(promise)
  return (
    <ul>
      {
        results.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      }
    </ul>
  )
}


export default function App() {
  // 搜索关键词
  const [keyword, setKeyword] = useState('')
  // 搜索结果
  const [searchPromise, setSearchPromise] = useState(null)
  // input change方法
  const handleChange = (keyword) => {
    // 判断并取消发送请求
    if (searchPromise?.controller) {
      searchPromise.controller.abort();
    }
    // 设置关键词
    setKeyword(keyword)
    // 发送请求
    setSearchPromise(keyword.trim() ? fecthSearchData(keyword) : null)
  }

  return (
    <>
      <h1>搜索列表</h1>
      <input type="text" value={keyword} onChange={(e) => handleChange(e.target.value)} />
      {keyword &&
        <Suspense fallback={<p>正在搜索{keyword}....</p>}>
          <SearchResult promise={searchPromise} />
        </Suspense>
      }
    </>
  )
}