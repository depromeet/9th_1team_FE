import styled from "styled-components";
import React from "react";

interface ColorSampleBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgColorA: string;
  bgColorB: string;
}

export const Button = styled.button`
  display: inline-flex;
  width: 36px;
  height: 36px;
  margin-left: 14px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
  &:first-child {
    margin-left: 0;
  }
  flex-direction: column;
  > span {
    width: 100%;
    height: 100%;
    flex: 1;
  }
`;

const ColorSampleBtn: React.FC<ColorSampleBtnProps> = ({
  onClick,
  bgColorA = "",
  bgColorB = "",
}) => {
  return (
    <Button onClick={onClick}>
      <span style={{ backgroundColor: bgColorA }} />
      <span style={{ backgroundColor: bgColorB }} />
    </Button>
  );
};

export default ColorSampleBtn;
