import React, { FormEvent } from "react"

const apiUrl = process.env.REACT_APP_API_URL || "null"

const LoginScreen = () => {
  // 执行登录的函数
  const login = (param: { username: string; password: string }) => {
    // 发送login请求
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(param)
    })
      // eslint-disable-next-line @typescript-eslint/require-await
      .then(async (response: Response) => {
        if (response.ok) {
          console.log(response)
        }
        return undefined
      })
      .catch(() => {
        throw new Error()
      })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止表单的默认行为
    event.preventDefault()
    // 浏览器自带的这个from表单的标准,就是在event.currentTarget.elements里面就包含了，我们输入的username还有password的信息
    // element[0]就是username的信息
    // 在这里我们为什么要加 as HTMLInputElement
    // 把as HTMLInputElement删掉value会报错,默认的类型会把这个element[0]当作一个element类型而element类型上面没有这个value
    // 所以我们告诉他，我知道我自己在干什么,告诉他是一个HTMLInputElement类型，听我的
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="passsword">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  )
}

export default LoginScreen
