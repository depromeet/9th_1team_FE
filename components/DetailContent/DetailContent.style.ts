import styled from "styled-components";

// header border-bottom 부분은 스크롤 했을때 나옴
export const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  position: relative;

  .detail__header {
    box-sizing: border-box;
    /* border-bottom: 1px solid black; */
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.4rem;
  }
  .icon {
    display: inline-block;
  }
  .icon__wrapper .icon:nth-child(1) {
    margin-right: 1.4rem;
  }
`;

export const MoreMenu = styled.ul<{ isOpen: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  width: 140px;
  position: absolute;
  right: 0;
  z-index: 2;
  background-color: #fff;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  margin-right: 1.6rem;

  li {
  }
  li a {
    display: inline-block;
    width: 100%;
    padding: 15px 0 15px 16px;
    font-size: 1.3rem;
    border-bottom: 1px solid #e9ecef;
    box-sizing: border-box;
  }
  li:last-child a {
    border-bottom: none;
  }
`;

export const RadioWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  .radio-box {
    position: relative;
    height: 143px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .radio-btn {
      position: absolute;
      display: inline-block;
      right: 0.7rem;
      top: 0.7rem;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/circle.svg");
    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + .radio-btn:before {
      content: "";
      position: absolute;
      right: 0.7px;
      top: 0.7px;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/check-circle.svg");
    }
  }
  .first {
    background-color: #e56f53;
  }
  .second {
    background-color: #ffd569;
  }
  h2 {
    font-family: "NanumSquareRound";
    font-size: 2rem;
    font-weight: 800;
  }
`;

export const BoxWrapper = styled.div`
  position: relative;
`;

export const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;