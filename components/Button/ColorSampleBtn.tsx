import React from "react";
import { Button } from './Button.style'

interface ColorSampleBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgColorA: string;
  bgColorB: string;
}

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
