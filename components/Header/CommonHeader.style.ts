import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 17px;
  text-align: center;
  color: #343a40;
  flex: 1;
`;

export const BtnContainer = styled.div``;
