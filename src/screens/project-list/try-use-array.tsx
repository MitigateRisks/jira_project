// 测试练习
import { useArray } from "utils"
import React from "react"

const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 }
  ]

  const { value, clear, removeIndex, add } = useArray(persons)
  // useMount(() => {})

  return (
    <div>
      <button type="button" onClick={() => add({ name: "john", age: 22 })}>
        addjson
      </button>
      <button type="button" onClick={() => removeIndex(0)}>
        remove 0
      </button>
      <button
        type="button"
        style={{ marginBottom: "50px" }}
        onClick={() => clear()}
      >
        clear
      </button>
      {value.map((person: { age: number; name: string }) => (
        <div style={{ marginBottom: "30px" }} key={person.name}>
          <span style={{ color: "red" }} />
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  )
}

export default TsReactTest
