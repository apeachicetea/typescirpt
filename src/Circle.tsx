import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

interface CircleProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  height: 200px;
  width: 200px;
  border-radius: 500px;
  background-color: ${(props) => props.bgColor};
`;

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
