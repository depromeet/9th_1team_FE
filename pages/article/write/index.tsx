import styled from "styled-components";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import { BALANCE_COLOR_SAMPLE_LIST } from "../../../lib/constants";
import Header from "components/Header";
import ImgIcon from "../../../public/image-frame.svg";
import VsIcon from "../../../public/versus.svg";
import VomitIcon from "../../../public/tomato/vomit-normal-front.svg";
import UnionIcon from "../../../public/union.svg";
import ColorPicker from "components/ColorPicker";

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
    $keywords: [CreateBalanceGameKeywordInput!]
    $file1: Upload
    $file2: Upload
  ) {
    createBalanceGame(
      createBalanceGameInput: {
        description: $description
        balanceGameSelections: [$balanceA, $balanceB]
        balanceGameKeywords: $keywords
      }
      file1: $file1
      file2: $file2
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

const CREATE_BALANCE_GAME_NOT_KEYWORD_MUTATION = gql`
  mutation createBalanceGame(
    $balanceA: CreateBalanceGameSelectionInput!
    $balanceB: CreateBalanceGameSelectionInput!
    $description: String!
    $keywords: [CreateBalanceGameKeywordInput!]
    $file1: Upload
    $file2: Upload
  ) {
    createBalanceGame(
      createBalanceGameInput: {
        description: $description
        balanceGameSelections: [$balanceA, $balanceB]
        balanceGameKeywords: $keywords
      }
      file1: $file1
      file2: $file2
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
    }
  }
`;

const WriteWrapper = styled.section`
  padding-bottom: 3.8rem;
`;

const BalanceCardTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  padding: 5px 0;
`;

const BalanceCard = styled.div<{ placeholderColor: string }>`
  position: relative;
  height: 143px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  font-size: 20px;
  font-weight: 800;
  color: rgba(52, 58, 64, 0.5);

  > textarea {
    position: absolute;
    width: 80%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    resize: none;
    font-family: "NanumSquareRound";
    font-weight: 800;
    font-size: 20px;
    line-height: 140%;
    &::placeholder {
      color: ${(props) => props.placeholderColor};
      opacity: 0.5;
    }
  }
`;

const BalanceCardBtn = styled.label`
  position: absolute;
  top: 8px;
  right: 12px;
  width: 22px;
  height: 20px;
  color: initial;
  > img {
    display: block;
    width: 22px;
    height: 20px;
  }
  > input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const BalanceTitle = styled.div`
  padding: 0 1.6rem;

  .title {
    margin: 6px 0;
    font-size: 12px;
    letter-spacing: -0.5px;
  }
`;

const TomatoMent = styled.div`
  display: flex;
  align-items: center;

  > svg {
    width: 22px;
    height: 27px;
  }
`;

const ChatArea = styled.div`
  position: relative;
  flex: 1;
  margin-left: 0.8rem;

  p {
    font-size: 1.1rem;
    color: #2a2a2d;
    position: absolute;
    left: 0;
    top: 50%;
    width: 15.3rem;
    text-align: center;
    transform: translateY(-50%);
  }

  svg {
  }
`;

const BalanceContainer = styled.div`
  margin-top: 6px;
  padding: 18px 16px;
  background-color: #f8f9fa;
`;

const BalanceCardContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  .vs {
    position: absolute;
    width: 28px;
    height: 16px;
    left: calc(50%);
    top: calc(50%);
    z-index: 1;
    transform: translate(-50%, -50%);
  }
`;

const ColorSamples = styled.div`
  padding: 10px 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColorSampleInfo = styled.div`
  color: #868e96;
  font-size: 11px;
  line-height: 16px;
`;

const TextInfoContainer = styled.div`
  position: relative;
  margin: 28px 16px 0;
  > .title {
    font-size: 13px;
    line-height: 140%;
    margin-bottom: 2px;
  }
  > .textarea {
    border-bottom: 1px solid #e9ecef;
    padding: 4px 0;
    white-space: pre-wrap;

    font-size: 14px;
    word-break: break-word;
    > textarea {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      outline: none;
      font-family: "Noto Sans KR";
      font-weight: 400;
      font-size: 14px;
      line-height: 175%;
      letter-spacing: -0.05em;
      color: #343a40;
      resize: none;
      &::placeholder {
        color: #adb5bd;
      }
    }
  }
  > .length {
    position: absolute;
    right: 16px;
    top: 0;
    font-size: 13px;
    line-height: 140%;
    color: #868e96;
  }
`;
const KeywordsContainer = styled.div`
  position: relative;
  margin: 28px 16px 0;
  > .title {
    font-size: 13px;
    line-height: 140%;
    margin-bottom: 2px;
  }
  > .input {
    border-bottom: 1px solid #e9ecef;
    padding: 4px 0;
    white-space: pre-wrap;
    font-size: 14px;
    word-break: break-word;
    > input {
      width: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      outline: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 175%;
      letter-spacing: -0.05em;
      color: #343a40;
      resize: none;
      &::placeholder {
        color: #adb5bd;
      }
    }
  }
`;

const SubmitBtnContainer = styled.div`
  margin: 28px 16px;
`;

const SubmitBtn = styled.button.attrs({
  type: "submit",
})`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  font-weight: bold;
  font-size: 14px;
  line-height: 165%;
  letter-spacing: -0.05em;

  background-color: #f74d4d;
  color: #ffffff;
  border: none;

  border-radius: 8px;

  &:disabled {
    background-color: #a5a5a5;
    color: #ffffff;
  }
`;

const BalanceCardBgImgRemoveBtn = styled.button`
  position: absolute;
  right: 11px;
  top: 7px;
  color: #ffffff;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  line-height: 16px;
  font-size: 11px;
  > img {
    width: 8px;
    height: 8px;
  }
`;

// interface Keyword {
//   name: string;
// }

// interface GameInfo {
//   description: string;
//   keywords?: Keyword[];
//   file1: string | null;
//   file2: string | null;
// }

const Write = () => {
  const router = useRouter();
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
  const [keywords, setKeywords] = useState("");
  const [colorPickerState, setColorPickerState] = useState(0);
  const [mCreateBalanceGame] = useMutation(CREATE_BALANCE_GAME_MUTATION);
  const [mCreateBalanceNotKeywordGame] = useMutation(
    CREATE_BALANCE_GAME_NOT_KEYWORD_MUTATION
  );

  const onChangeText =
    (type: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const onChangeColorGroup =
    (fontColorA = "", bgColorA = "", fontColorB = "", bgColorB = "") =>
    () => {
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

  const onChangeBgImg =
    (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
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

  const findHashtags = (searchText = "") => {
    const regexp = /(\#[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]+)/g;
    const result = searchText.match(regexp);
    if (result) {
      return result.map((name) => ({ name }));
    } else {
      return null;
    }
  };

  const onChangeKeywords = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keywords) {
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
          keywords: findHashtags(keywords),
          file1: balanceBgImgFileA,
          file2: balanceBgImgFileB,
        },
      });
    } else {
      mCreateBalanceNotKeywordGame({
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
          file1: balanceBgImgFileA,
          file2: balanceBgImgFileB,
        },
      });
    }
    router.push("/");
  };

  return (
    <>
      <Header title={"게임 만들기"} />
      <WriteWrapper>
        <form onSubmit={onSubmit}>
          <BalanceTitle>
            <TomatoMent>
              <VomitIcon />
              <ChatArea>
                <p>결정장애를 유발해보세요!</p>
                <UnionIcon />
              </ChatArea>
            </TomatoMent>
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
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
                    <ImgIcon />
                  </BalanceCardBtn>
                )}
              </BalanceCard>
              <div className={"vs"}>
                <VsIcon />
              </div>
              <BalanceCard
                placeholderColor={balanceFontColorB}
                style={{
                  backgroundColor: balanceBgColorB,
                  backgroundImage: `url(${balanceBgImgSrcB})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
                    <ImgIcon />
                  </BalanceCardBtn>
                )}
              </BalanceCard>
            </BalanceCardContainer>
            <ColorSamples>
              {BALANCE_COLOR_SAMPLE_LIST.map((colors, i) => (
                <ColorPicker
                  key={i}
                  id={i}
                  colorA={colors[1]}
                  colorB={colors[3]}
                  picked={colorPickerState === i}
                  setPicked={setColorPickerState}
                  onChangeColor={onChangeColorGroup(...colors)}
                />
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
                placeholder={"추가 설명이 필요하다면 입력해주세요!"}
                onChange={onChangeTextInfo}
                value={textInfo}
              />
            </div>
            <div className={"length"}>{textInfo.length}/250</div>
          </TextInfoContainer>
          <KeywordsContainer>
            <div className={"title"}>키워드</div>
            <div className={"input"}>
              <input
                placeholder={"#음식 #희망 #로또"}
                onChange={onChangeKeywords}
                value={keywords}
              />
            </div>
          </KeywordsContainer>
          <SubmitBtnContainer>
            <SubmitBtn disabled={isDisabledBtn()}>등록하기</SubmitBtn>
          </SubmitBtnContainer>
        </form>
      </WriteWrapper>
    </>
  );
};

export default Write;
