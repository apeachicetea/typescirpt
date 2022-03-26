function App() {
  //Object에 타입 지정은 1. type, 2. interface로 타입 지정 가능

  //type
  type Square = { color: string; width: number };
  //interface
  interface ISquare {
    color: string;
    width: number;
  }

  //interface의 장점:extends 기능
  interface IStudent {
    name: string;
  }

  interface ITeacher extends IStudent {
    age: number;
  }

  let 네모: Square = { color: "red", width: 100 };
  let 학생: IStudent = { name: "kim" };
  let 선생: ITeacher = { name: "kim", age: 20 };
  return <div>ㅗ</div>;
}

export default App;
