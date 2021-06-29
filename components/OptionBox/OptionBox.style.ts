import styled from 'styled-components';

export const OptionBoxContainer = styled.div<{
  isChecked: boolean | null;
}>`
  position: relative;
  height: 12.8rem;
  font-weight: 800;
  line-height: 2.6rem;
  :first-child {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }
  .checkbox {
    position: absolute;
    z-index: 3;
    top: 0.9rem;
    right: 1.2rem;
  }
  .title {
    font-family: 'NanumSquareRound';
    font-size: 2rem;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: ${({ isChecked }) =>
      isChecked === null ? 1 : isChecked ? 1 : 0.4};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
  }
`;
