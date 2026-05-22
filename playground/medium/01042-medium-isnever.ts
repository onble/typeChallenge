/*
  1042 - IsNever
  -------
  by hiroya iizuka (@hiroyaiizuka) #中等 #union #utils

  ### 题目

  Implement a type IsNever, which takes input type `T`.
  If the type of resolves to `never`, return `true`, otherwise `false`.

  For example:

  ```ts
  type A = IsNever<never> // expected to be true
  type B = IsNever<undefined> // expected to be false
  type C = IsNever<null> // expected to be false
  type D = IsNever<[]> // expected to be false
  type E = IsNever<number> // expected to be false
  ```

  > 在 Github 上查看：https://tsch.js.org/1042/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type IsNever<T> = T extends never ? true : false;
type IsNever<T> = [T] extends [never] ? true : false 

type test1 = never extends never ? true : false;
type test2 = [never] extends [never] ? true : false;

// TypeScript 有一条铁律：
// 当泛型参数 T = never 时，直接使用 T extends ... 会直接跳过条件判断，整体返回 never这叫 never 会在分布式条件类型中直接消失

// 为什么 [T] extends [never] 就可以？
// 因为：被 [] 包裹后，分布式条件类型被关闭了！


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1042/answer/zh-CN
  > 查看解答：https://tsch.js.org/1042/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
