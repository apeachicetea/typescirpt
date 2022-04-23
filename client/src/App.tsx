//polymorphism
//generic이란, 타입의 placeholder 같은 것이다
//위치는 인자 앞에 <>안에 원하는 변수명입력해서 사용하면 된다
//타입스크립트는 placeholder에서 타입스크립트가 여기에서 알아낸 타입으로 대체해준다

type SuperPrint = {
  <T>(arr: T[]): T;
};

const superPrint: SuperPrint = (arr) => {
  return arr[0];
};

const a = superPrint([1, 2, 3, 4]);
const b = superPrint([true, false, false, true]);
const c = superPrint(["1", "2"]);
const d = superPrint([1, 2, true, false]);

function App() {
  return <h1>App</h1>;
}
export default App;
