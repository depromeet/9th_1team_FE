import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";
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
  InputTextareaContainer,
  InputTextInfoContainer,
} from "./index.style";

Modal.setAppElement("#__next");

const Write = () => {
  const [textInfo, setTextInfo] = useState("");
  const [balanceBgA, setBalanceBgA] = useState("#E56F53");
  const [balanceBgB, setBalanceBgB] = useState("#FFD569");
  const [balanceTextA, setBalanceTextA] = useState("");
  const [balanceTextB, setBalanceTextB] = useState("");

  const onChangeText = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if ((type = "A")) {
      setBalanceTextA(e.target.value);
    } else if (type === "B") {
      setBalanceTextB(e.target.value);
    }
  };

  const onChangeTextInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInfo(e.target.value);
  };

  const setColorGroup = (colorA = "", colorB = "") => () => {
    if (balanceBgA === colorA && balanceBgB === colorB) {
      setBalanceBgA(colorB);
      setBalanceBgB(colorA);
    } else {
      setBalanceBgA(colorA);
      setBalanceBgB(colorB);
    }
  };

  return (
    <>
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
            <BalanceCard style={{ backgroundColor: balanceBgA }}>
              <input
                type="text"
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("A")}
                value={balanceTextA}
              />
              {balanceTextA ? balanceTextA : "밸런스 선택지를 입력하세요"}
              <BalanceCardBtn htmlFor={"balanceBgA"}>
                <input type="file" id={"balanceBgA"} />
                <img src="img.png" alt="img" />
              </BalanceCardBtn>
            </BalanceCard>
            <div className={"vs"}>
              <img src="img.png" alt="vs" />
            </div>
            <BalanceCard style={{ backgroundColor: balanceBgB }}>
              <input
                type="text"
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("B")}
                value={balanceTextA}
              />
              {balanceTextB ? balanceTextB : "밸런스 선택지를 입력하세요"}
              <BalanceCardBtn htmlFor={"balanceBgB"}>
                <input type="file" id={"balanceBgB"} />
                <img src="img.png" alt="img" />
              </BalanceCardBtn>
            </BalanceCard>
          </BalanceCardContainer>
          <ColorSamples>
            <ColorSample onClick={setColorGroup("#E56F53", "#FFD569")}>
              a
            </ColorSample>
            <ColorSample onClick={setColorGroup("#F99E4B", "#BAE476")}>
              a
            </ColorSample>
            <ColorSample onClick={setColorGroup("#54BE92", "#FFAFB2")}>
              a
            </ColorSample>
            <ColorSample onClick={setColorGroup("#74AADD", "#B0DD66")}>
              a
            </ColorSample>
            <ColorSample onClick={setColorGroup("#6980D1", "#FFAFB2")}>
              a
            </ColorSample>
            <ColorSample onClick={setColorGroup("#72ABE1", "#FFD569")}>
              a
            </ColorSample>
          </ColorSamples>
          <ColorSampleInfo>
            *한번 더 선택하면 위아래 색상이 전환됩니다.
          </ColorSampleInfo>
        </BalanceContainer>
        <InputTextInfoContainer>
          <div className={"title"}>내용</div>
          <div className={"textarea"}>
            <textarea onChange={onChangeTextInfo} value={textInfo} />
            {textInfo ? textInfo : "제목을 입력해주세요!"}
          </div>
          <div className={"length"}>{textInfo.length}/250</div>
        </InputTextInfoContainer>
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
