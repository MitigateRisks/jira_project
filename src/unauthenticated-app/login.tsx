import { useAuth } from "context/auth-context"
import React from "react"
import { Form, Input } from "antd"
// eslint-disable-next-line import/no-cycle
import useAsync from "utils/use-asyonc"
// eslint-disable-next-line import/no-cycle
import { LogButton } from "./index"

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    // 这个values为什么是username string password string呢？
    // ant degin怎么知道我们想要这个值
    // 是因为这里它是由这个name属性来推断的
    // try可以不用，因为有catch来检测
    try {
      await run(login(values)).catch(onError)
      // await login(values).catch(onError)
    } catch (e) {
      throw new Error()
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LogButton loading={isLoading} htmlType="submit" type="primary">
          登录
        </LogButton>
      </Form.Item>
    </Form>
  )
}

export default LoginScreen
