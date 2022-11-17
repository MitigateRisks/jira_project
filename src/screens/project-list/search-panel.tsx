import React from "react"

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps["param"]) => void
}

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => (
  // from这里的action用不到
  <form>
    <div>
      {/* 首先是一个input框，他的值param.name当他改变的时候，也就是onChange的时候，他的回调函数evt => setParam({...param,name: evt.target.value}) */}

      {/* 这句话等价于 setParam(Object.assign({},param,P{name:evt.target.value})) */}
      <input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParam({
            ...param,
            name: evt.target.value
          })
        }
      />

      {/* 下拉框 */}
      <select
        value={param.personId}
        onChange={(evt) =>
          setParam({
            ...param,
            personId: evt.target.value
          })
        }
      >
        {/* 这里要给option */}
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  </form>
)

export default SearchPanel
