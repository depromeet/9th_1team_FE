import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import { BALANCE_COLOR_SAMPLE_LIST } from "lib/constants";
import Header from "components/Header";
import ImgIcon from "public/image-frame.svg";
import VsIcon from "public/versus.svg";
import VomitIcon from "public/tomato/vomit-normal-front.svg";
import UnionIcon from "public/union.svg";
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
  SubmitBtn,
} from "./index.style";
import { useAppDispatch } from "redux/hooks";
import { changePrevPageWrite } from "redux/postsSlice";

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
    createBalanceGame(createBalanceGameInput: $createBalanceGameInput, file1: $file1, file2: $file2) {
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [textInfo, setTextInfo] = useState("");
  const [balanceFontColorA, setBalanceFontColorA] = useState(INIT_BALANCE_FONT_COLOR_A);
  const [balanceBgColorA, setBalanceBgColorA] = useState(INIT_BALANCE_BG_COLOR_A);
  const [balanceBgImgFileA, setBalanceBgImgFileA] = useState(null);
  const [balanceBgImgSrcA, setBalanceBgImgSrcA] = useState("");
  const [balanceFontColorB, setBalanceFontColorB] = useState(INIT_BALANCE_FONT_COLOR_B);
  const [balanceBgColorB, setBalanceBgColorB] = useState(INIT_BALANCE_BG_COLOR_B);
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
      alert("????????? ??? ?????? ???????????????.");
      router.push("/login");
    }
  }, []);

  const onChangeText = (type: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  const onChangeBgImg = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
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
    const regexp = /(\#[a-zA-Z???-???|???-???|???-???]+)/g;
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
                backgroundImage: "??????????????? ?????? ??????",
              },
              {
                order: 1,
                description: balanceTextB,
                textColor: balanceFontColorB,
                backgroundColor: balanceBgColorB,
                backgroundImage: "??????????????? ?????? ??????",
              },
            ],
            balanceGameKeywords: findHashtags(keywords),
          },
          file1: balanceBgImgFileA,
          file2: balanceBgImgFileB,
        },
      });
      const { id } = data?.createBalanceGame;
      dispatch(changePrevPageWrite(true));
      router.push(`/article/${id}`);
    } catch (e) {}
  };

  return (
    <>
      <Header title={"?????? ?????????"} />
      <WriteWrapper>
        <form onSubmit={onSubmit}>
          <BalanceTitle>
            <TomatoMent>
              <VomitIcon />
              <ChatArea>
                <p>??????????????? ??????????????????!</p>
                <UnionIcon />
              </ChatArea>
            </TomatoMent>
            <div className={"title"}>????????? ???????????? ????????? ?????? ????????? ?????? ?????? ????????? ???????????????.</div>
          </BalanceTitle>
          <BalanceContainer>
            <BalanceCardTitle>?????????</BalanceCardTitle>
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
                  placeholder={"????????? ???????????? ???????????????"}
                  onChange={onChangeText("A")}
                  value={balanceTextA}
                />
                {isExistBgImg("A") ? (
                  <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("A")}>
                    ???????????? <img src='img.png' alt='' />
                  </BalanceCardBgImgRemoveBtn>
                ) : (
                  <BalanceCardBtn htmlFor={"balanceBgColorA"}>
                    <input
                      type='file'
                      accept='image/*'
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
                  placeholder={"????????? ???????????? ???????????????"}
                  onChange={onChangeText("B")}
                  value={balanceTextB}
                />
                {isExistBgImg("B") ? (
                  <BalanceCardBgImgRemoveBtn onClick={onClickBgImgRemove("B")}>
                    ???????????? <img src='img.png' alt='' />
                  </BalanceCardBgImgRemoveBtn>
                ) : (
                  <BalanceCardBtn htmlFor={"balanceBgColorB"}>
                    <input
                      type='file'
                      accept='image/*'
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
            <ColorSampleInfo>*?????? ??? ???????????? ????????? ????????? ???????????????.</ColorSampleInfo>
          </BalanceContainer>
          <TextInfoContainer>
            <div className={"title"}>??????</div>
            <div className={"textarea"}>
              <TextareaAutosize
                placeholder={"?????? ????????? ??????????????? ??????????????????!"}
                onChange={onChangeTextInfo}
                value={textInfo}
              />
            </div>
            <div className={"length"}>{textInfo.length}/250</div>
          </TextInfoContainer>
          <KeywordsContainer>
            <div className={"title"}>?????????</div>
            <div className={"input"}>
              <input placeholder={"#?????? #?????? #??????"} onChange={onChangeKeywords} value={keywords} />
            </div>
          </KeywordsContainer>
          <SubmitBtnContainer>
            <SubmitBtn disabled={isDisabledBtn()}>????????????</SubmitBtn>
          </SubmitBtnContainer>
        </form>
      </WriteWrapper>
    </>
  );
};

export default Write;
