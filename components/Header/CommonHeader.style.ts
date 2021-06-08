import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 5.2rem;
  padding: 1.6rem;
  box-sizing: border-box;
`;

export const BackBtn = styled.button.attrs({
  type: "button",
})`
  box-sizing: border-box;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
`;

export const Title = styled.h1`
  font-family: "NanumSquareRound";
  font-weight: 800;
  font-size: 1.7rem;
  text-align: center;
  color: #343a40;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const BtnContainer = styled.div`
  display: flex;
`;
