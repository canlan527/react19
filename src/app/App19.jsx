import { useDeferredValue, useState } from "react"

// 构造 一个数组返回2w组数据
function expensiveData(deferredQuery) {
  return Array(20000).fill(0).map((v,i) => `第${i+1}项${deferredQuery}`)
}

function SearchResult({data}) {
  return (
    <ul>
      {
        data.map((item, index) => (
          <li key={index}>{item}</li>
        ))
      }
    </ul>
  )
}


export default function App() {
  const [query, setQuery] = useState('')
  // 创建延迟更新
  const deferredQuery = useDeferredValue(query)
  // 使用延迟更新的变量
  // 根据要延迟更新的query创建大量的data array
  const largeMountData = expensiveData(deferredQuery)
  
  return (
    <div>
      <h1>延迟展示搜索结果</h1>
      {/* 高优先级 */}
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* 低优先级 */}
      {query && <SearchResult data={largeMountData} />}
    </div>
  )
}
/**
 * useDefferedValue
 * 用于实现延迟更新，它接收一个值并返回一个延迟的值
 */