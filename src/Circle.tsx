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
