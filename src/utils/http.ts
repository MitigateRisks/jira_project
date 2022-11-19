import qs from "qs"
import * as auth from "auth-provider"
import { useAuth } from "context/auth-context"

const apiUrl = process.env.REACT_APP_API_URL || "null"

interface Config extends RequestInit {
  token?: string
  data?: object
}

// 当一个参数有默认值的时候它就自动变的可选了
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  let endpointCopy = endpoint
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "aplication/json" : ""
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === "GET") {
    endpointCopy += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  // axios 和 fetch 的表现不一样,axios可以直接在返回状态2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpointCopy}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout()
        // 页面刷新
        window.location.reload()
        // eslint-disable-next-line prefer-promise-reject-errors, promise/no-return-wrap
        return Promise.reject({ message: "请重新登录" })
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json()
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
      }
      // eslint-disable-next-line promise/no-return-wrap
      return Promise.reject(data)

      throw new Error()
    })
}

// 以http为基础，自动携带gwt token的方法
// 自定义hook
// 为什么要是一个hook呢？
// 如果你的函数里面要使用其他hook的话,那么你的函数本身就必须是一个hook
export const useHttp = () => {
  // 异步请求都是用这个useHttp的话，都可以从这个useAuth里面获取user
  // 然后把user里面的token自动加入到http请求的
  // Authorization的header里面
  const { user } = useAuth()
  // 有没有一种方法让我不用去查看，第一个是string
  // 第二个是config,而是直接从这个http里吧这个类型信息获取出来
  // 有的 用paramenters<typeof http>
  //
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}
