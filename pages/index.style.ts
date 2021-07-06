import styled from "styled-components";

interface ContainerProps {}

export const Container = styled.div<ContainerProps>`
  background: white;
  padding: 1.55rem 1.6rem;
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    justify-content: space-between;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4.8rem;
      font-weight: bold;
      font-size: 1.4rem;
      flex: 0.49;
      border: 1px solid #e9ecef;
      box-sizing: border-box;
      border-radius: 8px;
      letter-spacing: -0.05em;
      cursor: pointer;
      span {
        margin-left: 0.4rem;
      }
    }
  }
  .selects {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4rem;
    margin-bottom: 1.6rem;
  }
  .orders {
    display: flex;
    align-items: center;
    color: #adb5bd;
    font-size: 1.3rem;
  }
  .dot {
    margin: 0 0.78rem;
  }
`;

interface ParticipateProps {
  isFiltered: boolean
}

export const Participate = styled.div<ParticipateProps>`
  ::after {
    content: "참여한 밸런스 게임만 보기";
    color: ${({ isFiltered }) => (isFiltered ? "#343A40" : "#ADB5BD")};
    margin-left: 0.5rem;
    font-size: 1.3rem;
  }
  display: flex;
  align-items: center;
`;
