// 状态在register和login之间进行切换的
import React, { useState } from "react"
import LoginScreen from "./login"
import RegisterScreen from "./register"

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  )
}

export default UnauthenticatedApp
