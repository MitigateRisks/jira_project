import React, { ReactNode, useState } from "react"
import * as auth from "auth-provider"
import { User } from "screens/project-list/search-panel"

interface AuthForm {
  username: string
  password: string
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
