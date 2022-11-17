import React, { useState, useEffect } from "react"
import * as qs from "qs"
import { cleanObject, useMount, useDebounce } from "utils"
import List from "./list"
import SearchPanel from "./search-panel"

// 引入数据请求地址
const apiUrl = process.env.REACT_APP_API_URL || "null"

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
  const debounceParam = useDebounce(param, 200)

  // 请求的数据
  const [list, setList] = useState([])

  // 当状态发生改变的时候我们要用到useEffect
  useEffect(() => {
    // 描述获取项目接口的代码
    // 拼接.env下的REACT_APP_API_URL
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`)
      .then(async (response) => {
        // 请求成功要把数据保存下来
        if (response.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setList(await response.json())
        }
        return undefined
      })
      .catch(() => 1)
  }, [debounceParam])

  // 初始化uesrs，用到userEffect，因为只渲染一次所以要加[]
  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then(async (response) => {
        // 请求成功要把数据保存下来
        if (response.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setUsers(await response.json())
        }
        return undefined
      })
      .catch(() => 1)
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}
export default ProjectListScreen
