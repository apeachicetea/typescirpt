//interface
//타입스크립트에게 오브젝트의 모양을 설명해주는 하나의 목적으로만 사용가능하다
//type은 매우 다양한 용도로 쓰인다

type Player = {
  nickname: string;
  healthBar: number;
};

interface Player1 {
  nickname: string;
  healthBar: number;
}

const nico: Player = {
  nickname: "nico",
  healthBar: 10,
};

const deayoon: Player1 = {
  nickname: "deayoon",
  healthBar: 7,
};

function App() {
  return <h1>App</h1>;
}
export default App;
