import { useState, useEffect } from "react"

export const isFals = (value) => (value === 0 ? false : !value)

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFals(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMout = (callback) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后在运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
