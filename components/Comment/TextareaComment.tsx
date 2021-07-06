import React, { ChangeEvent, FormEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Container } from './Comment.style'

interface TextareaCommentProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLFormElement>) => void;
  value: string;
  mySelectionColor: string;
}

const TextareaComment: React.FC<TextareaCommentProps> = ({
  onSubmit,
  onChange,
  onClick,
  value,
  mySelectionColor,
}) => {
  return (
    <Container onSubmit={onSubmit} onClick={onClick}>
      <TextareaAutosize
        placeholder="의견을 입력해주세요"
        onChange={onChange}
        value={value}
      />
      <div
        className="form__user-pick"
        style={{
          backgroundColor: mySelectionColor || "#ffffff",
          borderColor: mySelectionColor || "lightgray",
        }}
      />
      <button type="submit" className="submit-btn">
        등록
      </button>
    </Container>
  );
};

export default TextareaComment;
