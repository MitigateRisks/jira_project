import React, { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import useProjects from "utils/project"
import useUsers from "utils/user"
// import { Helmet } from "react-helmet"
import List from "./list"
import SearchPanel from "./search-panel"

const ProjectListScreen = () => {
  // 项目负责人
  // useState初始化对象
  const [param, setParam] = useState({
    name: "",
    personId: ""
  })
  //  debounceParam
  const debounceParam = useDebounce(param, 400)

  const { isLoading, error, data: list } = useProjects(debounceParam)

  const { data: users } = useUsers()

  useDocumentTitle("项目列表", false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
}
export default ProjectListScreen

const Container = styled.div`
  padding: 3.2rem;
`
