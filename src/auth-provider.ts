// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发
// 模拟第三方服务的auth provider
import { User } from "screens/project-list/search-panel"

const localStorageKey = "__auth_provider_token__"

const apiUrl = process.env.REACT_APP_API_URL || "null"

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "")
  return user
}

export const login = (data: { username: string; password: string }) =>
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async (response: Response) => {
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return handleUserResponse(await response.json())
      }
      // eslint-disable-next-line promise/no-return-wrap
      return Promise.reject(data)
    })
    .catch(() => {
      throw new Error()
    })
export const register = (data: { username: string; password: string }) =>
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async (response: Response) => {
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return handleUserResponse(await response.json())
      }
      // eslint-disable-next-line promise/no-return-wrap
      return Promise.reject(data)
    })
    .catch(() => {
      throw new Error()
    })

// eslint-disable-next-line @typescript-eslint/require-await
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
