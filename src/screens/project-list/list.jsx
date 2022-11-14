//React component里面的文件虽然没有直接用到react,但是一定要引入react
import React from "react"

export const List = ({ users, list }) => {
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        // jsx里面的每一个列表，就是用map来渲染的每一个列表的里面的元素，都需要一个独特的KEY
        list.map(project => <tr key={project.name}>
          <td>{project.name}</td>
          {/* 像这种find方法他很有可能返回undefined方法，会变成undefined.name,这样会报错，所以要用到可选链式符?. */}
          {/* ?.的意思是当?前面的表达式如果返回的是undefined，那么整个表达式返回undefined */}
          <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
        </tr>)
      }
    </tbody>
  </table>
}