import { Suspense, use } from "react"
import PropTypes from 'prop-types'

function fetchDataByTime(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time.toString())
    }, time)
  })
}

function ComponentA({ data }) {
  const time = use(data)
  return (
    <div>ComponentA: {time}</div>
  )
}
ComponentA.propTypes = {
  data: PropTypes.object.isRequired
}

function ComponentB({ data }) {
  const time = use(data)
  return (
    <div>ComponentB: {time} </div>
  )
}
ComponentB.propTypes = {
  data: PropTypes.object.isRequired
}
function ComponentC({ data }) {
  const time = use(data)
  return (
    <div>ComponentC: {time}</div>
  )
}
ComponentC.propTypes = {
  data: PropTypes.object.isRequired
}
export default function App() {

  const dataA = fetchDataByTime(3000)
  const dataB = fetchDataByTime(6000)
  const dataC = fetchDataByTime(9000)

  return <Suspense fallback={<p>loading...</p>}>
    <ComponentA data={dataA} />
    <Suspense fallback={<p>loading...</p>}>
      <ComponentB data={dataB} />
    </Suspense>
    <Suspense fallback={<p>loading...</p>}>
      <ComponentC data={dataC} />
    </Suspense>
  </Suspense>
}