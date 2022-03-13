import { useState } from "react";
import styled from "styled-components";

interface IContainerProps {
  bgColor: string;
  borderColor: string;
}

interface ICircleProps {
  //required
  bgColor: string;
  // optional
  borderColor?: string;
  text?: string;
}

const Container = styled.div<IContainerProps>`
  height: 200px;
  width: 200px;
  border-radius: 500px;
  background-color: ${(props) => props.bgColor};
  border: 5px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor, text = "default text" }: ICircleProps) {
  // useState의 타입을 < number | string > 와 같이 정의할 수 있지만
  // useState에 default Value의 타입에 따라 타입스크립트가 같은 타입으로 오는것을 인지하기에 따로 지정은 불필요
  // const [counter, setCounter] = useState<number | string>(1);
  const [counter, setCounter] = useState(1);
  return (
    <>
      {/* borderColor ?? bgColor => borderColor가 undefined일떄 ?? 뒤를 채택 */}
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
      </Container>
    </>
  );
}

export default Circle;
