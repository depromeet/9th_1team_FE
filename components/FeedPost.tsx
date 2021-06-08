import styled from "styled-components";
import Opinion from "public/opinion.svg";
import Share from "public/share.svg";
import More from "public/more.svg";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import VS from "public/versus.svg";
import Fire from "public/fire.svg";
import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { modifyDate } from "utils/date";

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
  color: string;
}

const OptionBox = ({
  type,
  isSelected,
  title,
  checkType,
  setCheckType,
  background,
  color,
}: OptionBoxProps) => {
  const handleCheckType = (type: CHECK_TYPE) => {
    if (checkType === type) setCheckType(CHECK_TYPE.NONE);
    else setCheckType(type);
  };
  return (
    <OptionBoxContainer
      {...{ checkType, isSelected }}
      style={{ background, color }}
    >
      <div className="checkbox">{isSelected ? <Select /> : <Unselect />}</div>
      <div className="title" onClick={() => handleCheckType(type)}>
        {title}
      </div>
    </OptionBoxContainer>
  );
};

const GameFire = () => (
  <>
    <div className="fire">
      <div className="fire__rectangle">50</div>
      <div
        style={{
          position: "absolute",
          top: "-2.5rem",
          left: "-2.1rem",
          zIndex: 3,
        }}
      >
        <Fire />
      </div>
      <div className="fire__rectangle">50</div>
    </div>
    <div className="line" />
    <div className="line" />
  </>
);

interface FeedPostProps {
  data?: any;
}

const FeedPost: React.FC<FeedPostProps> = ({ data }) => {
  const [checkType, setCheckType] = useState(CHECK_TYPE.NONE);

  const [balanceA, balanceB] = data.balanceGameSelections;

  return (
    <Container>
      <OptionBox
        type={CHECK_TYPE.FIRST}
        isSelected={checkType === CHECK_TYPE.FIRST}
        title={balanceA.description}
        checkType={checkType}
        setCheckType={setCheckType}
        background={balanceA.backgroundColor}
        color={balanceA.textColor}
      />
      <OptionBox
        type={CHECK_TYPE.SECOND}
        isSelected={checkType === CHECK_TYPE.SECOND}
        title={balanceB.description}
        checkType={checkType}
        setCheckType={setCheckType}
        background={balanceB.backgroundColor}
        color={balanceB.textColor}
      />
      <Versus>{checkType === CHECK_TYPE.NONE ? <VS /> : <GameFire />}</Versus>

      <div className="content">
        <div className="content__title">
          <Link href={`/article/${data.id}`}>{data.description}</Link>
        </div>
        <div className="content__state">
          <div>
            참여 {data.totalVoteCount} • 의견 {data.commentCount} •{" "}
            {modifyDate(data.createdAt)}
          </div>
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
  position: relative;
  box-sizing: border-box;
  .content {
    padding: 1rem 0;
    color: #606060;
    &__title {
      display: block;
      padding: 0 0.8rem 0.3rem 0.8rem;
      color: #222222;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > a {
        text-decoration: none;
        color: inherit;
      }
    }
    &__state {
      padding: 0 0.8rem;
      display: flex;
      margin-top: 0.4rem;
      font-size: 1.1rem;
      line-height: 1.6rem;
      color: #868e96;
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

const OptionBoxContainer = styled.div<{
  isSelected: boolean;
  checkType: CHECK_TYPE;
}>`
  position: relative;
  height: 12.8rem;
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
  .title {
    font-family: "NanumSquareRound";
    font-size: 2rem;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: ${({ isSelected, checkType }) =>
      !isSelected ? (checkType === CHECK_TYPE.NONE ? 1 : 0.4) : 1};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    box-sizing: border-box;
  }
`;

const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 25.6rem;
  .fire {
    position: absolute;
    &__rectangle {
      :first-child {
        top: auto;
        bottom: -0.4rem;
        left: auto;
        right: 0.3rem;
        border-radius: 12px 12px 0px 12px;
        color: #e56f53;
      }
      color: #f8d272;

      top: -0.4rem;
      left: 0.3rem;
      position: absolute;
      z-index: 1;
      font-size: 1.4rem;
      font-weight: 800;
      padding: 0.3rem 0.9rem;
      padding-top: 0.5rem;
      background: #f8f9fa;
      box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
      border-radius: 0px 12px 12px 12px;
    }
  }
  .line {
    width: 50%;
    height: 0.8rem;
    position: absolute;
    z-index: 0;
    left: 0;
    background: #e56f53;
    :last-child {
      left: auto;
      right: 0;
      background: #f8d272;
    }
  }
`;

export default FeedPost;
