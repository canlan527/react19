import { use } from 'react'

const hello = Promise.resolve('hello')
const world = Promise.resolve('world')

function App() {
  const flag = true;
  return <div>
    {flag ? use(hello) : use(world)}
  </div>
}

export default App;

/**
 * use 用在条件语句中
 */