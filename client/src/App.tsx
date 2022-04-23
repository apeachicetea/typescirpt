//ex1
function superPrint<V>(a: V[]) {
  return a[0];
}

//ex2
type Player<E> = {
  name: string;
  extraInfo: E;
};

type DeayoonExtra = { favFood: string };

type DaeyoonPlayer = Player<DeayoonExtra>;

const daeyoon: DaeyoonPlayer = {
  name: "kim",
  extraInfo: {
    favFood: "Pizza",
  },
};

const hyun: Player<null> = {
  name: "hyun",
  extraInfo: null,
};

//ex3
//Array<number> === number[]
type A = Array<number>;

let a: A = [1, 2, 3, 4];

//ex4
function printAllNumbers(arr: Array<number>) {
  return arr;
}

function App() {
  return <h1>App</h1>;
}
export default App;
