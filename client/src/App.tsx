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

//unknown
//변수의 타입을 미리 알지 못할때 unknown을 사용함
let x: unknown;

if (typeof x === "number") {
  let y = x + 1;
}

if (typeof x === "string") {
  let y = x.toUpperCase();
}

//void
function hi(): void {
  return;
}

//never
function hello(name: string | number) {
  if (typeof name === "string") {
    return name;
  } else if (typeof name === "number") {
    return name;
  } else {
    //여기서 name의 타입은 never이다.
    return name;
  }
}

function App() {
  return <h1>App</h1>;
}
export default App;
