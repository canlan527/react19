import React, { Component } from "react";
import PropTypes from 'prop-types'

// const getMessage = Promise.resolve('hello react19')
const getMessage = Promise.reject('err message')

function App() {
  console.log('app')
  return (
    <ErrorBoundary>
      <Message/>
    </ErrorBoundary>)
}

function Message() {
  const data = use(getMessage)
  return <div>{data}</div>
}

// 错误边界组件
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }
  // 静态方法，派生出错的state对象
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了，被我捕获到了: {this.state.error}</div>
    }
    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

// 实现use
function use(promise) {
  // if(!(promise instanceof Promise)) {
  //   return promise;
  // }
  switch (promise.status) {
    case 'fulfilled':
      return promise.value;
    case 'rejected':
      throw promise.reason;
    default:
      throw promise.then((value) => {
        promise.status = 'fulfilled'
        promise.value = value;
      }, (reason) => {
        promise.status = 'rejected'
        promise.reason = reason
      })
  }
}
export default App

/**
 * use:在渲染中读取资源
 * 可以使用use读取一个promise，react将挂起，指导promise解析完成
 * use用于直接处理异步数据和操作
 * 捕获错误
 */