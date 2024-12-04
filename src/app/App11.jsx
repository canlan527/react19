import { Suspense, use, useState } from "react";
import PropTypes from 'prop-types'

function createPromise(value, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, duration)
  })
}

function DisplayMessage({data}) {
  const message = use(data)
  return (
    <div>{message}</div>
  )
}

DisplayMessage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default function App() {
  // 设置初始数据
  const [promise, setPromise] = useState(() => createPromise('初次数据', 1000))



  return (
    <div>
      <h1>更改数据</h1>
      <Suspense fallback={<p>loading...</p>}>
        <DisplayMessage data={promise}/>
      </Suspense>
      <button onClick={() => setPromise(() => createPromise('更新后的数据', 3000))}>更改数据</button>
    </div>
  )
}

//更改数据