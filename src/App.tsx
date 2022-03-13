import React, { useState } from "react";
import styled from "styled-components";
import Circle from "./Circle";

const Wrapper = styled.div`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

function App() {
  const [value, setValue] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default App;
