import React, { Dispatch, SetStateAction } from "react";
import {
  PickerWrapper,
  Border,
  ColorWrapper,
  Color
} from './ColorPicker.style'

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
      <Border picked={picked} />
      <ColorWrapper>
        <Color color={colorA}></Color>
        <Color color={colorB}></Color>
      </ColorWrapper>
    </PickerWrapper>
  );
};

export default ColorPicker;
