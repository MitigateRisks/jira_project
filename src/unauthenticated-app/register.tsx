import { useAuth } from "context/auth-context"
import React from "react"
import { Form, Input } from "antd"
// eslint-disable-next-line import/no-cycle
import { LogButton } from "unauthenticated-app"

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"))
      return
    }
    // 这个values为什么是username string password string呢？
    // ant degin怎么知道我们想要这个值
    // 是因为这里它是由这个name属性来推断的
    register(values).catch(onError)
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LogButton htmlType="submit" type="primary">
          注册
        </LogButton>
      </Form.Item>
    </Form>
  )
}

export default RegisterScreen
