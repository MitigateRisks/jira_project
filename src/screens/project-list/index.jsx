import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useState, useEffect } from "react"
import qs from "qs"
import { cleanObject } from "utils"

//引入数据请求地址
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  //下拉框状态
  const [users, setUsers] = useState([]);

  //项目负责人
  //useState初始化对象
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  //请求的数据
  const [list, setList] = useState([])

  //当状态发生改变的时候我们要用到useEffect
  useEffect(() => {
    // 描述获取项目接口的代码
    //拼接.env下的REACT_APP_API_URL
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      // 请求成功要把数据保存下来
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  //初始化uesrs，用到userEffect，因为只渲染一次所以要加[]
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      // 请求成功要把数据保存下来
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}