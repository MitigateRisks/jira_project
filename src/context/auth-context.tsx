import React, { ReactNode, useState } from "react"
// eslint-disable-next-line import/no-cycle
import { http } from "utils/http"
import * as auth from "auth-provider"
import { User } from "screens/project-list/search-panel"
import { useMount } from "utils"

interface AuthForm {
  username: string
  password: string
}

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    // 自己指定token用到http ,useHttp不是自己指定token
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await http("me", { token })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    user = data.user
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user
}

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (from: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = "AuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  // 函数式编程一个重要的的概念
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  // 在页面加载的时候我们调用bootstrapUser
  // bootsrapUser会调用getToken，从localStorage尝试去读取token
  // 如果能读到值就去请求me API
  // 这个me API的返回值就包括user信息
  // 就把这个返回的data.user返回出来
  // 通过setUser赋值
  useMount(() => {
    bootstrapUser()
      .then(setUser)
      .catch(() => {
        throw new Error()
      })
  })

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/no-children-prop
      children={children}
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ user, login, register, logout }}
    />
  )
}

// 自定义hook
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用")
  }
  return context
}
