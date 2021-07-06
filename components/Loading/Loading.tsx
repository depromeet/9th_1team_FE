import { Container } from './Loading.style'

const Loading: React.FC = () => {
  return (
    <Container width={"auto"} height={"100px"}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </Container>
  );
};

export default Loading;
