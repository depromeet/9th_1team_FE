import React, { ChangeEvent, FormEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
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
  SubmitBtn,
  SubmitBtnContainer,
  TextInfoContainer,
  BalanceCardBgImgRemoveBtn,
} from "./index.style";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import { BALANCE_COLOR_SAMPLE_LIST } from "../../../lib/constants";

Modal.setAppElement("#__next");

const [
  INIT_BALANCE_FONT_COLOR_A,
  INIT_BALANCE_BG_COLOR_A,
  INIT_BALANCE_FONT_COLOR_B,
  INIT_BALANCE_BG_COLOR_B,
] = BALANCE_COLOR_SAMPLE_LIST[0];

const CREATE_BALANCE_GAME_MUTATION = gql`
  mutation createBalanceGame(
    $balanceA: CreateBalanceGameSelectionInput!
    $balanceB: CreateBalanceGameSelectionInput!
    $description: String!
  ) {
    createBalanceGame(
      createBalanceGameInput: {
        description: $description
        balanceGameSelections: [$balanceA, $balanceB]
        balanceGameKeywords: [
          { name: "음식" }
          { name: "토사물" }
          { name: "고전" }
        ]
      }
    ) {
      id
      userId
      totalVoteCount
      balanceGameSelections {
        id
        order
        voteCount
        description
        textColor
        backgroundColor
        backgroundImage
        balanceGameId
      }
      balanceGameKeywords {
        id
        name
        balanceGameId
      }
    }
  }
`;

const Write = () => {
  const [textInfo, setTextInfo] = useState("");
  const [balanceFontColorA, setBalanceFontColorA] = useState(
    INIT_BALANCE_FONT_COLOR_A
  );
  const [balanceBgColorA, setBalanceBgColorA] = useState(
    INIT_BALANCE_BG_COLOR_A
  );
  const [balanceBgImgFileA, setBalanceBgImgFileA] = useState(null);
  const [balanceBgImgSrcA, setBalanceBgImgSrcA] = useState("");
  const [balanceFontColorB, setBalanceFontColorB] = useState(
    INIT_BALANCE_FONT_COLOR_B
  );
  const [balanceBgColorB, setBalanceBgColorB] = useState(
    INIT_BALANCE_BG_COLOR_B
  );
  const [balanceBgImgFileB, setBalanceBgImgFileB] = useState(null);
  const [balanceBgImgSrcB, setBalanceBgImgSrcB] = useState("");
  const [balanceTextA, setBalanceTextA] = useState("");
  const [balanceTextB, setBalanceTextB] = useState("");

  const [mCreateBalanceGame, { data }] = useMutation(
    CREATE_BALANCE_GAME_MUTATION
  );

  const onChangeText = (type: string) => (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const str = e.target.value.replace(/\n/g, "");

    if (type === "A") {
      setBalanceTextA(str);
    } else if (type === "B") {
      setBalanceTextB(str);
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

  const onChangeColorGroup = (
    fontColorA = "",
    bgColorA = "",
    fontColorB = "",
    bgColorB = ""
  ) => () => {
    if (balanceBgColorA === bgColorA && balanceBgColorB === bgColorB) {
      setBalanceFontColorA(fontColorB);
      setBalanceBgColorA(bgColorB);
      setBalanceFontColorB(fontColorA);
      setBalanceBgColorB(bgColorA);
    } else {
      setBalanceFontColorA(fontColorA);
      setBalanceBgColorA(bgColorA);
      setBalanceFontColorB(fontColorB);
      setBalanceBgColorB(bgColorB);
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

  const isDisabledBtn = () => {
    return !balanceTextA || !balanceTextB || !textInfo;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mCreateBalanceGame({
      variables: {
        balanceA: {
          order: 0,
          description: balanceTextA,
          textColor: balanceFontColorA,
          backgroundColor: balanceBgColorA,
          backgroundImage: "미구현인데 필수 필드",
        },
        balanceB: {
          order: 1,
          description: balanceTextB,
          textColor: balanceFontColorB,
          backgroundColor: balanceBgColorB,
          backgroundImage: "미구현인데 필수 필드",
        },
        description: textInfo,
      },
    });
  };

  console.log(data?.createBalanceGame);

  return (
    <>
      <form onSubmit={onSubmit}>
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
              placeholderColor={balanceFontColorA}
              style={{
                backgroundColor: balanceBgColorA,
                backgroundImage: `url(${balanceBgImgSrcA})`,
              }}
            >
              <TextareaAutosize
                style={{
                  color: balanceFontColorA,
                }}
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("A")}
                value={balanceTextA}
              />
              {isExistBgImg("A") ? (
                <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("A")}>
                  사진삭제 <img src="img.png" alt="" />
                </BalanceCardBgImgRemoveBtn>
              ) : (
                <BalanceCardBtn htmlFor={"balanceBgColorA"}>
                  <input
                    type="file"
                    accept="image/*"
                    id={"balanceBgColorA"}
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
              placeholderColor={balanceFontColorB}
              style={{
                backgroundColor: balanceBgColorB,
                backgroundImage: `url(${balanceBgImgSrcB})`,
              }}
            >
              <TextareaAutosize
                style={{
                  color: balanceFontColorB,
                }}
                placeholder={"밸런스 선택지를 입력하세요"}
                onChange={onChangeText("B")}
                value={balanceTextB}
              />
              {isExistBgImg("B") ? (
                <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("B")}>
                  사진삭제 <img src="img.png" alt="" />
                </BalanceCardBgImgRemoveBtn>
              ) : (
                <BalanceCardBtn htmlFor={"balanceBgColorB"}>
                  <input
                    type="file"
                    accept="image/*"
                    id={"balanceBgColorB"}
                    onChange={onChangeBgImg("B")}
                  />
                  <img src="img.png" alt="img" />
                </BalanceCardBtn>
              )}
            </BalanceCard>
          </BalanceCardContainer>
          <ColorSamples>
            {BALANCE_COLOR_SAMPLE_LIST.map((colors, i) => (
              <ColorSample key={i} onClick={onChangeColorGroup(...colors)}>
                a
              </ColorSample>
            ))}
          </ColorSamples>
          <ColorSampleInfo>
            *한번 더 선택하면 위아래 색상이 전환됩니다.
          </ColorSampleInfo>
        </BalanceContainer>
        <TextInfoContainer>
          <div className={"title"}>내용</div>
          <div className={"textarea"}>
            <TextareaAutosize
              placeholder={"제목을 입력해주세요!"}
              onChange={onChangeTextInfo}
              value={textInfo}
            />
          </div>
          <div className={"length"}>{textInfo.length}/250</div>
        </TextInfoContainer>
        <SubmitBtnContainer>
          <SubmitBtn disabled={isDisabledBtn()}>등록하기</SubmitBtn>
        </SubmitBtnContainer>
      </form>
    </>
  );
};

export default Write;
