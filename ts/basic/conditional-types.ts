// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
interface Fish {
  name: string;
  type: 'fish';
}

interface Bird {
  name: string;
  type: 'bird'; // 字面量类型
}

interface Swimming {
  swimming: string
}

interface Sky {
  sky: string
}

type MapType<T> = T extends Fish ? Swimming : Sky

type IEnv = MapType<Fish | Bird>

// implement Exclude type

type Exclude<T, U> = T extends U ? never : T
// type Exclude<string,boolean> = string
// type Exclude<boolean,boolean> = never
// string | never
type MyExclude = Exclude<string | boolean, boolean>

type Extract<T, U> = T extends U ? T : never
type MyExtract = Extract<string | boolean, boolean>

type NonNullable<T> = T extends null | undefined ? never : T
type MyNonNullable = NonNullable<string | boolean | null | undefined>

//infer: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types

export {};