import { use } from 'react'

const promiselist = [
  Promise.resolve('hello'),
  Promise.resolve('world'),
  Promise.resolve('react19')
]

function App() {
  return (
    promiselist.map((promise, index) =>
      <div key={index}>{use(promise)}</div>
    )
  )
}

export default App;
/**
 * use用在循环里
 */