import { useAuth } from "context/auth-context"
import React from "react"
import { Form, Input, Button } from "antd"
// eslint-disable-next-line import/no-cycle
import { LogButton } from "./index"

const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) => {
    // 这个values为什么是username string password string呢？
    // ant degin怎么知道我们想要这个值
    // 是因为这里它是由这个name属性来推断的
    login(values).catch(() => {
      throw new Error()
    })
  }

  return (
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
        <LogButton htmlType="submit" type="primary">
          登录
        </LogButton>
      </Form.Item>
    </Form>
  )
}

export default LoginScreen
