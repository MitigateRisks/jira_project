import { useEffect } from "react"
import { User } from "screens/project-list/search-panel"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import useAsync from "./use-asyonc"

const useUsers = (param?: Partial<User>) => {
  // 引入http方法可以自动携带token
  const client = useHttp()

  const { run, ...result } = useAsync<User[]>()

  // 当状态发生改变的时候我们要用到useEffect
  useEffect(() => {
    // 这样用报错错误应该为一个参数，传入两个参数，是因为useHttp的接受参数问题
    // 解决在useHttp接受参数里用...扩展运算符来接受
    void run(client("users", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}

export default useUsers
