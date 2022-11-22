import React, { ReactNode } from "react"

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

// http://github.com/bvaughn/react-error-boundary

// 错误边界一定要用class component来实现
// eslint-disable-next-line react/prefer-stateless-function
class ErrorBoundary extends React.Component<
  // eslint-disable-next-line react/no-unused-prop-types
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  // eslint-disable-next-line react/state-in-constructor, react/no-unused-state
  state = { error: null }

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}

export default ErrorBoundary
