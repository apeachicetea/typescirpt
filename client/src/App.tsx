//basic syntax
let a: number = 1;
let b: string = "i1";
let c: boolean = true;
let d: boolean[] = [false];

//optinal type
const player: { name: string; age?: number } = {
  name: "nico",
};

//type aliases
type Player = { name: string; age?: number };

const User: Player = {
  name: "kim",
  age: 32,
};

const Friend: Player = {
  name: "Park",
};

//function type
function playerMaker(name: string): Player {
  return {
    name,
  };
}

const daeyoon: Player = playerMaker("daeyoon");
daeyoon.age = 32;

const playerMaker2 = (name: string): Player => ({ name });

//readonly
const names: readonly string[] = ["1", "2"];

//tuple
const player2: [string, number, boolean] = ["1", 2, false];

function App() {
  return <h1>App</h1>;
}
export default App;
