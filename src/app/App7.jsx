import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

const imgCache = new Map()
// 定义异步加载图片的方法
function preLoadeImage(src) {
  // 如果之前走过这个方法，就意味着已经set了一个src，这里读取并返回
  if(imgCache.has(src)) {
    return imgCache.get(src)
  }
  let status = 'pending'
  let result = null;

  const promise = new Promise((resolve, reject) => {
    // 创建图片资源对象，成功resolve，失败reject
    const img = new Image()
    img.src = src

    img.onload = function () {
      status = 'success'
      result = src
      resolve(result)
    }
  
    img.onerror = function() {
      status = 'error'
      result = new Error('picture loaded error')
      reject(result)
    }
  })

  const resource = {
    read() {
      if(status==='pending') throw promise;
      if(status ==='error') throw result;
      return result
    }
  }

  // 存储资源进度
  imgCache.set(src, resource)

  return resource;
}

function ImageLoader({src}) {
  const resource = preLoadeImage(src)

  return (
    <div>
      <img src={resource.read()} />
    </div>
  )
}
ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
}

export default function App() {
  return (
    <Suspense fallback={<p>loading img...</p>}>
      <ImageLoader src="https://i.pinimg.com/474x/b3/4b/6a/b34b6abba0a702db2785be4625d42203.jpg" />
    </Suspense>
  )
}

/**
 * Suspense可以捕获子组件向外抛出的promise,并且会等待Promsie完成再重新渲染子组件
 * 也可以异步渲染图片/资源
 */