/*
  1097 - IsUnion
  -------
  by null (@bencor) #中等 #union

  ### 题目

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > 在 Github 上查看：https://tsch.js.org/1097/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsUnionImpl<T, C extends T = T> = (T extends T ? C extends T ? true : unknown : never) extends true ? false : true;
// type IsUnion<T> = IsUnionImpl<T>;

// type IsUnion<U, U1 = U> = [U] extends [never] ? false : (U extends any ? [U1] extends [U] ? false : true : never);

// TypeScript 有一个分布式条件类型特性：
// 当联合类型进入 T extends any 时，会自动拆分成每一个类型单独判断
// 比如：string | number 进入 U extends any→ 先判断 string extends any→ 再判断 number extends any→ 最后把结果合并成联合类型
// 而非联合类型（如 string）不会拆分，只会执行一次。

// type IsUnion<U, U1 = U> = Equal<(U extends any ? U1 extends U ? true : false : false), boolean>;

type falseFlase = false | false;
type trueTrue = true | true;
type test = trueTrue extends falseFlase ? true : false;
type test2 = true | true extends boolean ? true : false;
type test3 = true | false extends boolean ? true : false;
type test4 = true | false;
type test5 = boolean extends false ? true : false;
type test6 = boolean extends true ? true : false;
// 只要是相同字面量的联合，TS 会自动向上合并成基础类型！

// way1: length of the union
// relate to a hard challenge: UnionToTuple
// 将 U 转换为 Tuple，然后判断其长度即可
type U2I<U> = (U extends any ? (u: U) => any : never) extends (i: infer I) => any ? I : never
type Last<U> = U2I<U extends any ? () => U : never> extends () => infer R ? R : never
type ToTuple<U> = [U] extends [never] ? [] : [Last<U>, ...ToTuple<Exclude<U, Last<U>>>]
type IsUnion<U, Count = ToTuple<U>['length']> = Count extends 0 ? false : Count extends 1 ? false : true;

type U2IGo<U> = U extends any ? () => U : never
type testU2I = U2I<string | number>
type testU2I2 = U2I<{ a: string } | { a: number }>
type testU2I3 = U2I<U2IGo<string | number>>
type testLast1 = Last<string | number>;
type myLast<U> = U extends () => infer R ? R : never;
type testLast = myLast<testU2I3>;
type testToTuple = ToTuple<string | number>;
type testIsUnion = IsUnion<string | number>;



/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1097/answer/zh-CN
  > 查看解答：https://tsch.js.org/1097/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
