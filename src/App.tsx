import React, { useState } from "react";
import Circle from "./Circle";

function App() {
  const [value, setValue] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <Circle bgColor='tomato' borderColor='yellow' />
      <Circle bgColor='teal' text='Hello' />
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={value}
          onChange={onChange}
          placeholder='username'
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
