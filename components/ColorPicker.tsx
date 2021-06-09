import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const PickerWrapper = styled.div<{ picked: boolean }>`
  width: 3.2rem;
  height: 3.2rem;
  display: inline-block;
  border-radius: 0.8rem;
  border: ${({ picked }) => (picked ? "4px solid #fff" : "2px solid #fff")};
  box-shadow: ${({ picked }) =>
    picked ? "0px 2px 2px rgba(0, 0, 0, 0.1)" : "none"};
`;

const ColorWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.8rem;
  overflow: hidden;
`;

const Color = styled.div<{ color: string }>`
  background-color: ${({ color }) => (color ? color : "#fff")};
  width: 100%;
  height: 50%;
`;

interface colorProps {
  id: number;
  colorA: string;
  colorB: string;
  picked: boolean;
  setPicked: Dispatch<SetStateAction<number>>;
  onChangeColor: () => void;
}

const ColorPicker: React.FC<colorProps> = ({
  id,
  colorA,
  colorB,
  picked,
  setPicked,
  onChangeColor,
}) => {
  const onClickPicker = () => {
    onChangeColor();
    setPicked(id);
  };
  return (
    <PickerWrapper onClick={onClickPicker} picked={picked}>
      <ColorWrapper>
        <Color color={colorA}></Color>
        <Color color={colorB}></Color>
      </ColorWrapper>
    </PickerWrapper>
  );
};

export default ColorPicker;
