import { useState } from "react"

interface State<D> {
  error: Error | null
  data: D | null
  // 异步操作 没发生idle 正在发生loading 发生完了出现错误error 发生完了没有出现状态success
  stat: "idle" | "loading" | "error" | "success"
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null
}

const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null
    })

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null
    })

  // 用来触发异步请求
  const run = (promise?: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据")
    }
    setState({ ...state, stat: "loading" })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error: Error) => {
        // catch会消化异常，如果不主动抛出外面是接收不到异常的
        setError(error)
        // eslint-disable-next-line promise/no-return-wrap
        return Promise.reject(error)
      })
  }

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state
  }
}

export default useAsync
