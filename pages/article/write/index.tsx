import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import { SketchPicker } from "react-color";
import {
  Header,
  Title,
  CloseBtn,
  HelpBtn,
  BalanceCardTitle,
  BalanceCard,
  BalanceTitle,
  BalanceCardBtn,
  BalanceCardContainer,
  BalanceContainer,
  ColorSamples,
  ColorSample,
  ColorSampleInfo,
  InputContainer,
  SubmitBtn,
  SubmitBtnContainer,
} from "./index.style";

Modal.setAppElement("#__next");

const Write = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenColor, setIsOpenColorModal] = useState(false);
  const [isOpenSubText, setIsOpenSubText] = useState(false);
  const [balanceId, setBalanceId] = useState("");
  const [color, setColor] = useState({});
  const [text, setText] = useState("");
  const [subText, setSubText] = useState("");
  const [ballanceDataA, setBallanceDataA] = useState(null);
  const [ballanceDataB, setBallanceDataB] = useState(null);

  const onClose = () => {
    setIsOpenModal(false);
    setBalanceId("");
  };

  const onColorClose = () => {
    setIsOpenColorModal(false);
    setColor("");
  };

  const onOpenBalance = (balanceId: string) => () => {
    setIsOpenModal(true);
    setBalanceId(balanceId);
  };

  const handleChangeComplete = (color: string) => {
    setColor(color);
  };

  const onAddSubText = () => {
    setIsOpenSubText(true);
  };

  const onRemoveSubText = () => {
    setIsOpenSubText(false);
  };

  const onText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubText = (e: ChangeEvent<HTMLInputElement>) => {
    setSubText(e.target.value);
  };

  const onSuccess = () => {};

  return (
    <>
      <Modal isOpen={isOpenModal} onRequestClose={onClose}>
        <div>선택지 {balanceId}</div>
        <div>
          <input
            placeholder="내용을 입력해주세요"
            value={text}
            onChange={onText}
          />
          {isOpenSubText && (
            <input
              placeholder="서브 텍스트 내용을 입력해주세요"
              value={subText}
              onChange={onSubText}
            />
          )}
        </div>
        <div>
          {!isOpenSubText ? (
            <button onClick={onAddSubText}>서브 텍스트 추가하기</button>
          ) : (
            <button onClick={onRemoveSubText}>서브 텍스트 삭제</button>
          )}
          <button onClick={() => setIsOpenColorModal(true)}>
            텍스트 색상 변경
          </button>
          <input type="file" />
        </div>
        <div>
          <button onClick={onSuccess}>완료</button>
        </div>
      </Modal>
      <Modal isOpen={isOpenColor} onRequestClose={onColorClose}>
        <SketchPicker
          color={color.hex}
          onChangeComplete={handleChangeComplete}
        />
      </Modal>
      <div>
        <Header>
          <CloseBtn>x</CloseBtn>
          <Title>밸런스 게임 만들기</Title>
          <HelpBtn>x</HelpBtn>
        </Header>
        <BalanceTitle>
          <div className={"img"}>
            <img src="/img.png" width={38} height={34} alt="" />
          </div>
          <div className={"title"}>
            밸런스 선택지를 만들고 내용 작성을 통해 추가 설명이 가능합니다.
          </div>
        </BalanceTitle>
        <BalanceContainer>
          <BalanceCardTitle>선택지</BalanceCardTitle>
          <BalanceCardContainer>
            <BalanceCard onClick={onOpenBalance("A")}>
              선택지 등록
              <BalanceCardBtn>
                <img src="img.png" alt="img" />
              </BalanceCardBtn>
            </BalanceCard>
            <div className={"vs"}>
              <img src="img.png" alt="vs" />
            </div>
            <BalanceCard
              style={{ backgroundColor: "red" }}
              onClick={onOpenBalance("B")}
            >
              선택지 등록
              <BalanceCardBtn>
                <img src="img.png" alt="img" />
              </BalanceCardBtn>
            </BalanceCard>
          </BalanceCardContainer>
          <ColorSamples>
            <ColorSample>a</ColorSample>
            <ColorSample>a</ColorSample>
            <ColorSample>a</ColorSample>
            <ColorSample>a</ColorSample>
            <ColorSample>a</ColorSample>
            <ColorSample>a</ColorSample>
          </ColorSamples>
          <ColorSampleInfo>
            *한번 더 선택하면 위아래 색상이 전환됩니다.
          </ColorSampleInfo>
        </BalanceContainer>
        <InputContainer>
          <div className={"title"}>내용</div>
          <div className={"input"}>
            <input type="text" placeholder="제목을 입력해주세요!" />
          </div>
          <div className={"length"}>0/250</div>
        </InputContainer>
        <InputContainer>
          <div className={"title"}>키워드</div>
          <div className={"input"}>
            <input type="text" placeholder="#음식 #희망 #로또" />
          </div>
        </InputContainer>
        <SubmitBtnContainer>
          <SubmitBtn>등록하기</SubmitBtn>
        </SubmitBtnContainer>
      </div>
    </>
  );
};

export default Write;
