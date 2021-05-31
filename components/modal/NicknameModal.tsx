import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import CommonHeader from "../Header/CommonHeader";
import {
  Container,
  DeleteCircleIconBtn,
  InputNickname,
  InputNicknameContainer,
  SubmitBtn,
  SubmitBtnContainer,
} from "./NicknameModal.style";
import DeleteCircleIcon from "public/delete-circle.svg";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";

Modal.setAppElement("#__next");

interface NicknameModalProps {
  initNickname: string;
  email: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

const SET_PROFILE_MUTATION = gql`
  mutation setProfile($nickname: String!, $email: String!) {
    setProfile(setProfileInput: { nickname: $nickname, email: $email }) {
      email
      nickname
    }
  }
`;

const customStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    padding: 0,
  },
};

const NicknameModal = ({
  initNickname,
  isOpen,
  onRequestClose,
  email,
}: NicknameModalProps) => {
  const [mSetProfile] = useMutation(SET_PROFILE_MUTATION);
  const [value, setValue] = useState(initNickname);
  const [isAvailableNicknameModify, setIsAvailableNicknameModify] =
    useState(false);

  useEffect(() => {
    const isAvailableNicknameModify = !!(value && value !== initNickname);
    setIsAvailableNicknameModify(isAvailableNicknameModify);
  }, [value]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClear = () => {
    setValue("");
  };

  const onSubmitNicknameModify = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAvailableNicknameModify) return null;

    try {
      await mSetProfile({
        variables: {
          nickname: value,
          email,
        },
      });
      alert("닉네임변경이 완료되었습니다.");
      window.location.reload();
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <Container onSubmit={onSubmitNicknameModify}>
        <CommonHeader onClickBack={onRequestClose} title={"닉네임 수정"} />
        <InputNicknameContainer>
          <InputNickname value={value} onChange={onChangeValue} />
          <DeleteCircleIconBtn onClick={onClear}>
            <DeleteCircleIcon />
          </DeleteCircleIconBtn>
        </InputNicknameContainer>
        <SubmitBtnContainer>
          <SubmitBtn disabled={!isAvailableNicknameModify}>수정 완료</SubmitBtn>
        </SubmitBtnContainer>
      </Container>
    </Modal>
  );
};

export default NicknameModal;
