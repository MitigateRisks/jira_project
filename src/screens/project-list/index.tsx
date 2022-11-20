import React, { useState, useEffect } from "react"
import { cleanObject, useMount, useDebounce } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import List from "./list"
import SearchPanel from "./search-panel"

const ProjectListScreen = () => {
  // 下拉框状态
  const [users, setUsers] = useState([])

  // 项目负责人
  // useState初始化对象
  const [param, setParam] = useState({
    name: "",
    personId: ""
  })

  //  debounceParam
  const debounceParam = useDebounce(param, 400)

  // 请求的数据
  const [list, setList] = useState([])

  // 引入http方法可以自动携带token
  const client = useHttp()

  // 当状态发生改变的时候我们要用到useEffect
  useEffect(() => {
    // 这样用报错错误应该为一个参数，传入两个参数，是因为useHttp的接受参数问题
    // 解决在useHttp接受参数里用...扩展运算符来接受
    // client("projects", { data: cleanObject(debounceParam) })
    client("projects", { data: cleanObject(debounceParam) })
      .then(setList)
      .catch(() => {
        throw new Error()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])

  // 初始化uesrs，用到userEffect，因为只渲染一次所以要加[]
  useMount(() => {
    client("users")
      .then(setUsers)
      .catch(() => {
        throw new Error()
      })
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}
export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
