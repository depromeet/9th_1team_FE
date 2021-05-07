import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import { Dispatch, SetStateAction, useState } from "react";

enum CHECK_TYPE {
  FIRST = "FIRST",
  SECOND = "SECOND",
  NONE = "NONE",
}
interface OptionBoxProps {
  type: CHECK_TYPE;
  isSelected: boolean;
  title: string;
  checkType: CHECK_TYPE;
  setCheckType: Dispatch<SetStateAction<CHECK_TYPE>>;
  background: string;
}

const OptionBox = ({
  type,
  isSelected,
  title,
  checkType,
  setCheckType,
  background,
}: OptionBoxProps) => {
  const handleCheckType = (type: CHECK_TYPE) => {
    if (checkType === type) setCheckType(CHECK_TYPE.NONE);
    else setCheckType(type);
  };
  return (
    <OptionBoxContainer
      style={{ background, color: "white" }}
      onClick={() => handleCheckType(type)}
      isSelected={isSelected}
    >
      <div className="checkbox">{isSelected ? <Select /> : <Unselect />}</div>{" "}
      <div style={{ opacity: isSelected ? 0.4 : 1 }}>{title}</div>
    </OptionBoxContainer>
  );
};

const FeedPost = () => {
  const [checkType, setCheckType] = useState(CHECK_TYPE.NONE);

  return (
    <Container>
      <OptionBox
        type={CHECK_TYPE.FIRST}
        isSelected={checkType === CHECK_TYPE.FIRST}
        title="추성훈 선수한테 맞고 이국종 교수한테 수술받기"
        checkType={checkType}
        setCheckType={setCheckType}
        background="#E66F53"
      />
      <OptionBox
        type={CHECK_TYPE.SECOND}
        isSelected={checkType === CHECK_TYPE.SECOND}
        title="이국종 교수한테 맞고 추성훈 선수한테 수술받기"
        checkType={checkType}
        setCheckType={setCheckType}
        background="#FFD569"
      />

      <div className="content">
        <div className="content__title">
          굳세게 무엇을 인생을 같이 청춘을 내려온 위여, 우리 위하여...{" "}
        </div>
        <div className="content__state">
          <div>참여 1034 • 의견 145 • 1일전</div>
        </div>
        <div className="content__buttons">
          <div className="content__buttons__button">
            <Opinion />
          </div>
          <div className="content__buttons__button">
            <Share />
          </div>
          <div className="content__buttons__button">
            <More />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 36rem;
  border: 1px solid #e9ecef;
  border-radius: 0.8rem;
  margin-bottom: 2.5rem;
  background: white;
  .content {
    padding: 1rem 0;
    color: #606060;
    &__title {
      padding: 0 0.8rem;
      color: #222222;
      font-size: 1.3rem;
    }
    &__state {
      padding: 0 0.8rem;
      display: flex;
      margin-top: 0.5rem;
      font-size: 1.1rem;
    }
    &__buttons {
      padding: 1.3rem 0.8rem;
      margin-top: 1rem;
      border: 0 solid #e9ecef;
      border-top-width: 0.1rem;
      display: flex;
      font-size: 1.3rem;
      color: #343a40;
      font-weight: 500;
      &__button {
        display: flex;
        align-items: center;
        :first-child {
          ::after {
            content: "의견 쓰기";
            margin-left: 0.4rem;
          }
        }
        :nth-child(2) {
          margin-left: 1.4rem;
          ::after {
            content: "공유하기";
            margin-left: 0.4rem;
          }
        }
        :last-child {
          margin-left: auto;
        }
      }
    }
  }
`;

const OptionBoxContainer = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  height: 12.7rem;
  font-size: 2rem;
  font-weight: 800;
  line-height: 2.6rem;
  :first-child {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
  }
  .checkbox {
    position: absolute;
    top: 0.9rem;
    right: 1.2rem;
  }
`;

export default FeedPost;
