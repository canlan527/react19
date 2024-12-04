import {  use, useState, Suspense} from 'react'

function fetchPages(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 构造数据
      const pageData = Array.from({length: 5}, (v, i) => `第${page}页数据项${i+1}`)
      resolve(pageData)
    }, 1000)
  })
}

function PageList({data}) {
  const res = use(data)
  console.log(res)
  return (
    <>
      {
        res.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      }
    </>
  )
}

export default function App() {
  // 数组列表pages
  const [current, setCurrent] = useState(1)
  const [pages, setPages] = useState(() => [fetchPages(current)])
  console.log(pages)
  const handleLoadmore = () => {
    console.log('handle')
    const curPage = current +1;
    setCurrent(curPage)
    // setPages([fetchPages(curPage)]) // 翻页
    setPages([...pages,fetchPages(curPage)]) // loadmore
  }
  return (
    <div>
      {
        pages.map((pagePromise, index) => (
          <Suspense key={index} fallback={<div>loading....</div>}>
            <PageList data={pagePromise}/>
          </Suspense>
        ))
      }
      <button onClick={handleLoadmore}>load more</button>
    </div>
  )
}