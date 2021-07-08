import { Container } from "./Loading.style";

interface LoadingProps {
  width?: number;
  height?: number;
}

const Loading: React.FC<LoadingProps> = ({ width, height }) => {
  return (
    <Container width={width ? `${width}rem` : "auto"} height={height ? `${height}rem` : "100px"}>
      <svg viewBox='0 0 50 50'>
        <circle cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
      </svg>
    </Container>
  );
};

export default Loading;
