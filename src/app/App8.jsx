import React, { Suspense, use} from 'react'
import PropTypes from 'prop-types'

// 根据id请求用户
async function fetchUserData(id) {
  const res = await fetch(`http://localhost:3300/user/${id}`)
  return res.json()// 将响应对象转换成json对象
}

function UserProfile({user}) {
  // 使用use包裹promsie请求，返回data数据
  const data = use(user)
  return (
    <div>
      <p>name: {data.name}</p>
      <p>email: {data.email}</p>
    </div>
  )
}

UserProfile.propType = {
  user: PropTypes.object.isRequired,
}

export default function App() {
  // fetch请求接口 
  const user = fetchUserData(100)

  return (
    <Suspense fallback={<p>loading...</p>}>
      <UserProfile user={user}/>
    </Suspense>
  )
}

/**
 * Suspense可以捕获子组件向外抛出的promise,并且会等待Promsie完成再重新渲染子组件
 * 也可以异步渲染图片/资源
 * 数据获取
 */