import { useState, useEffect } from "react"

export const isFals = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ""

// 在一个函数里，改变传入的对象本身是不好的
// [key:string]:unknown 就表示我想要一个这样的{name:'jack'}键值对,不要其他像这种()=>{}空的类型
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    // 涉及到泛型
    const value = result[key]
    // 小bug，如果这个value为false,也会被删掉
    // 如果传入的object是一个{checked:false}，按照这个逻辑，这个checked也会被删掉
    // 解决：在新建一个isVoid函数
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // 依赖项里加上callback会造成无线循环，这个和useCallback以及useMemo有关系
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
