import React, { ChangeEvent, useRef, useState } from "react";
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
  InputTextInfoContainer,
  BalanceCardBgImgRemoveBtn,
} from "./index.style";

Modal.setAppElement("#__next");

const Write = () => {
  const [textInfo, setTextInfo] = useState("");
  const [balanceBgA, setBalanceBgA] = useState("#E56F53");
  const [balanceBgImgFileA, setBalanceBgImgFileA] = useState(null);
  const [balanceBgImgSrcA, setBalanceBgImgSrcA] = useState("");
  const [balanceBgB, setBalanceBgB] = useState("#FFD569");
  const [balanceBgImgFileB, setBalanceBgImgFileB] = useState(null);
  const [balanceBgImgSrcB, setBalanceBgImgSrcB] = useState("");
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
    if (e.target.value.length > 250) {
      const newStr = e.target.value.substr(0, 250);
      setTextInfo(newStr);
      return;
    }
    setTextInfo(e.target.value);
  };

  const onChangeColorGroup = (colorA = "", colorB = "") => () => {
    if (balanceBgA === colorA && balanceBgB === colorB) {
      setBalanceBgA(colorB);
      setBalanceBgB(colorA);
    } else {
      setBalanceBgA(colorA);
      setBalanceBgB(colorB);
    }
  };

  const onChangeBgImg = (type: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const [file]: any = e.target.files;
    if (file) {
      const src = URL.createObjectURL(file);
      if (type === "A") {
        setBalanceBgImgFileA(file);
        setBalanceBgImgSrcA(src);
      } else if (type === "B") {
        setBalanceBgImgFileB(file);
        setBalanceBgImgSrcB(src);
      }
    }
  };

  const onClickBgImgRemove = (type: string) => () => {
    if (type === "A") {
      setBalanceBgImgFileA(null);
      setBalanceBgImgSrcA("");
    } else if (type === "B") {
      setBalanceBgImgFileB(null);
      setBalanceBgImgSrcB("");
    }
  };

  const isExistBgImg = (type: string) => {
    if (type === "A") {
      return balanceBgImgSrcA && balanceBgImgFileA;
    } else if (type === "B") {
      return balanceBgImgSrcB && balanceBgImgFileB;
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
            <BalanceCard
              style={{
                backgroundColor: balanceBgA,
                backgroundImage: `url(${balanceBgImgSrcA})`,
              }}
            >
              <input
                type="text"
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("A")}
                value={balanceTextA}
              />
              {balanceTextA ? balanceTextA : "밸런스 선택지를 입력하세요"}
              {isExistBgImg("A") ? (
                <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("A")}>
                  사진삭제 <img src="img.png" alt="" />
                </BalanceCardBgImgRemoveBtn>
              ) : (
                <BalanceCardBtn htmlFor={"balanceBgA"}>
                  <input
                    type="file"
                    accept="image/*"
                    id={"balanceBgA"}
                    onChange={onChangeBgImg("A")}
                  />
                  <img src="img.png" alt="img" />
                </BalanceCardBtn>
              )}
            </BalanceCard>
            <div className={"vs"}>
              <img src="img.png" alt="vs" />
            </div>
            <BalanceCard
              style={{
                backgroundColor: balanceBgB,
                backgroundImage: `url(${balanceBgImgSrcB})`,
              }}
            >
              <input
                type="text"
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("B")}
                value={balanceTextA}
              />
              {balanceTextB ? balanceTextB : "밸런스 선택지를 입력하세요"}

              {isExistBgImg("B") ? (
                <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("B")}>
                  사진삭제 <img src="img.png" alt="" />
                </BalanceCardBgImgRemoveBtn>
              ) : (
                <BalanceCardBtn htmlFor={"balanceBgB"}>
                  <input
                    type="file"
                    accept="image/*"
                    id={"balanceBgB"}
                    onChange={onChangeBgImg("B")}
                  />
                  <img src="img.png" alt="img" />
                </BalanceCardBtn>
              )}
            </BalanceCard>
          </BalanceCardContainer>
          <ColorSamples>
            <ColorSample onClick={onChangeColorGroup("#E56F53", "#FFD569")}>
              a
            </ColorSample>
            <ColorSample onClick={onChangeColorGroup("#F99E4B", "#BAE476")}>
              a
            </ColorSample>
            <ColorSample onClick={onChangeColorGroup("#54BE92", "#FFAFB2")}>
              a
            </ColorSample>
            <ColorSample onClick={onChangeColorGroup("#74AADD", "#B0DD66")}>
              a
            </ColorSample>
            <ColorSample onClick={onChangeColorGroup("#6980D1", "#FFAFB2")}>
              a
            </ColorSample>
            <ColorSample onClick={onChangeColorGroup("#72ABE1", "#FFD569")}>
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
