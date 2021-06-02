import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

const Container = styled.form`
  position: relative;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 0 1.3rem;

  .submit-btn {
    font-family: "Noto Sans KR";
    padding: 0;
    font-size: 1.3rem;
  }
`;

interface TextareaCommentProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextareaComment: React.FC<TextareaCommentProps> = ({
  onSubmit,
  onChange,
  value,
}) => {
  return (
    <Container onSubmit={onSubmit}>
      <textarea
        placeholder="의견을 입력해주세요"
        onChange={onChange}
        value={value}
      />
      <div className="form__user-pick" />
      <button type="submit" className="submit-btn">
        등록
      </button>
    </Container>
  );
};

export default TextareaComment;
