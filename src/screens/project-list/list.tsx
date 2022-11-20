// React component里面的文件虽然没有直接用到react,但是一定要引入react
import React from "react"
import { User } from "screens/project-list/search-panel"
import { Table } from "antd"
import dayjs from "dayjs"

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

interface ListProps {
  list: Project[]
  users: User[]
}

const List = ({ list, users }: ListProps) => (
  <Table
    pagination={false}
    columns={[
      {
        title: "名称",
        dataIndex: "name",
        // localeCompare可以排序我们的中文字符
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: "部门",
        dataIndex: "organization"
      },
      {
        title: "负责人",
        render(value, project) {
          return (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          )
        }
      },
      {
        title: "创建时间",
        render(value, project) {
          return (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          )
        }
      }
    ]}
    dataSource={list}
  />
)
export default List
