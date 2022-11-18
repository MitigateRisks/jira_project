module.exports = (req, res, next) => {
  //这样就来捕获我们刚发送的这个Login请求
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        // 登录认证和注册我们将使用GWT(Google Web Toolkit)的技术
        user: {
          token: "123"
        }
      })
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" })
    }
  }
  next()
  //把middleware注入的package.json里的json-server
}
