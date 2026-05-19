/*
  90 - 可选类型的键
  -------
  by yituan (@yi-tuan) #困难 #utils

  ### 题目

  实现高级工具类型`OptionalKeys<T>`，该类型将 T 中所有可选属性的键合并为一个联合类型。

  > 在 Github 上查看：https://tsch.js.org/90/zh-CN
*/

/* _____________ 你的代码 _____________ */

type OptionalKeys<T> = {[P in keyof T]-?: {} extends Pick<T,P> ? P:never}[keyof T]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number, b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined, c?: string, d?: null }>, 'b' | 'c' | 'd'>>,
  Expect<Equal<OptionalKeys<{}>, never>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/90/answer/zh-CN
  > 查看解答：https://tsch.js.org/90/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/

/** 若 T 上存在任意可选属性则为 true，否则为 false */
type HasOptionalKeys<T> = [OptionalKeys<T>] extends [never] ? false : true

type A = HasOptionalKeys<{ x: number; y?: string }> // true
type B = HasOptionalKeys<{ x: number; y: string }> // false
type C = HasOptionalKeys<{ x: undefined; y?: undefined }> // true（y 可选）
type D = HasOptionalKeys<{}> // false