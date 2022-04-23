//overloading
//오버로딩은 함수가 서로 다른 여러개의 call signatures를 가지고 있을 때 발생시킨다
type Add = {
  (a: number, b: number): number;
  (a: number, b: string): number;
};

const add: Add = (a, b) => {
  if (typeof b === "string") return a;
  return a + b;
};

type Add1 = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add1: Add1 = (a, b, c?: number) => {
  if (c) return a + b + c;
  return a + b;
};

//next.js에서 Router.push사용시 overloading 사용 예시
type Config = {
  path: string;
  state: object;
};

type Push = {
  (path: string): void;
  (config: Config): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path);
  }
};

function App() {
  return <h1>App</h1>;
}
export default App;
