import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import ColorPicker from "components/ColorPicker/ColorPicker";
import { parseCookies } from "nookies";
import {
  WriteWrapper,
  BalanceTitle,
  TomatoMent,
  ChatArea,
  BalanceContainer,
  BalanceCardTitle,
  BalanceCardContainer,
  BalanceCard,
  BalanceCardBgImgRemoveBtn,
  BalanceCardBtn,
  ColorSamples,
  ColorSampleInfo,
  TextInfoContainer,
  KeywordsContainer,
  SubmitBtnContainer,
  SubmitBtn
} from './index.style'

const [
  INIT_BALANCE_FONT_COLOR_A,
  INIT_BALANCE_BG_COLOR_A,
  INIT_BALANCE_FONT_COLOR_B,
  INIT_BALANCE_BG_COLOR_B,
] = BALANCE_COLOR_SAMPLE_LIST[0];

const CREATE_BALANCE_GAME_MUTATION = gql`
  mutation createBalanceGame(
    $createBalanceGameInput: CreateBalanceGameInput!
    $file1: Upload
    $file2: Upload
  ) {
    createBalanceGame(
      createBalanceGameInput: $createBalanceGameInput
      file1: $file1
      file2: $file2
    ) {
      id
    }
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

  useEffect(() => {
    const { token } = parseCookies();
    if (!token) {
      alert("로그인 후 사용 가능합니다.");
      router.push("/login");
    }
  }, []);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await mCreateBalanceGame({
        variables: {
          createBalanceGameInput: {
            description: textInfo,
            balanceGameSelections: [
              {
                order: 0,
                description: balanceTextA,
                textColor: balanceFontColorA,
                backgroundColor: balanceBgColorA,
                backgroundImage: "미구현인데 필수 필드",
              },
              {
                order: 1,
                description: balanceTextB,
                textColor: balanceFontColorB,
                backgroundColor: balanceBgColorB,
                backgroundImage: "미구현인데 필수 필드",
              },
            ],
            balanceGameKeywords: findHashtags(keywords),
          },
          file1: balanceBgImgFileA,
          file2: balanceBgImgFileB,
        },
      });
      const { id } = data?.createBalanceGame;

      router.push(`/article/${id}`);
    } catch (e) {}
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
