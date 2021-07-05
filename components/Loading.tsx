import styled from "styled-components";

interface SVGProps {
  width: string;
  height: string;
}

const Container = styled.div<SVGProps>`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    animation: rotate 2s linear infinite;
    z-index: 2;
    width: 30px;
    height: 30px;
    & > circle {
      stroke: #cccccc;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
    @-webkit-keyframes rotate {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    @keyframes rotate {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  }
`;

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
