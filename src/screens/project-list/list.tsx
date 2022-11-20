// React component里面的文件虽然没有直接用到react,但是一定要引入react
import React from "react"
import { User } from "screens/project-list/search-panel"
import { Table } from "antd"

interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
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
        title: "负责人",
        render(value, project) {
          return (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          )
        }
      }
    ]}
    dataSource={list}
  />
)
export default List
