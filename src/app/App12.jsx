import { Suspense, use, useState } from "react";
import PropTypes from 'prop-types'

function createPromise(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

function Item({item}) {
  const res = use(item)
  return (
    <div>{res}</div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired
}

function List({list}) {
  return (
    <div>
        {
          list.map((item, index) => (
            <Suspense key={index} fallback={<div>loading....</div>}>
              <Item item={item} />
            </Suspense>
          ))
        }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default function App() {

  const [list, setList] = useState([createPromise('数据1')])

  return (
    <div>
      <h2>列表数据新增</h2>
      <List list={list} />
      <button onClick={() => setList([...list, createPromise(`新增数据${list.length+1}`)])}>新增一项</button>
    </div>
  )
}