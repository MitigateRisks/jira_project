import { useState, useEffect } from "react"

//
export const isFals = (value: unknown) => (value === 0 ? false : !value)

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    // 涉及到泛型
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = result[key]
    if (isFals(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// ts表示参数可有可无
// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后在运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

// 测试练习配合try-use-array.tsx文件
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}
