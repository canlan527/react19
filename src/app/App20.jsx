import { useEffect, useState, useTransition } from "react"

// 生成大量数据
function largeMountData(deferredQuery) {
  return Array(20000).fill(0).map((v, i) => `第${i + 1}项 for ${deferredQuery}`)
}
function SearchResults({ results, isPending }) {
  return (
    <ul style={{ opacity: `${isPending?0.3:1}` }}>{
      results.map((item, index) => (
        <li key={index}>{item}</li>
      ))
    }</ul>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  // 结果展示
  const [results, setResults] = useState([])
  // 用于延迟的变量,isPending代表挂起状态，startTransition是开始过渡的函数
  const [isPending, startTransition] = useTransition()

  const handleChange = (event) => {
    const value = event.target.value
    setQuery(() => value)
  }

  useEffect(() => {
    // 延迟更新
    startTransition(() => {
      if (query.trim()) {
        const largeData = largeMountData(query)
        setResults(largeData)
      }

    })
  }, [query])

  return (
    <div>
      <h1>延迟更新</h1>
      <input type="text" value={query} onChange={(e) => handleChange(e)} />
      {/* 延迟更新 */}
      <SearchResults results={results} isPending={isPending} />
    </div>
  )
}

/**
 * useTransition
 * 用于控制更新优先级，允许将某些更新记为过滤任务，通过将任务的优先级分为高优先级和低优先级
 */