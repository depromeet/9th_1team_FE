import _ from "lodash";
import React from "react";
import styled from "styled-components";
import MiniCard from "./MiniCard";
import VomitIcon from "public/tomato/vomit-light-side.svg";

type ListProps = {
  list: {
    id: string;
    commentCount: number;
    totalVoteCount: number;
    balanceGameSelections: {
      description: string;
      backgroundColor: string;
      backgroundImage: string;
      textColor: string;
    }[];
  }[];
  isModifyMode: Boolean;
};

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Empty = styled.div`
  height: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  p {
    margin-top: 2rem;
  }
`;

const MiniCards: React.FC<ListProps> = ({
  list = [],
  isModifyMode = false,
}) => {
  if (_.isEmpty(list))
    return (
      <Empty>
        <VomitIcon />
        <p>내가 만든 밸런스 게임이 없습니다.</p>
      </Empty>
    );
  return (
    <CardsWrapper>
      {list.map((item) => (
        <MiniCard key={item.id} item={item} isModifyMode={isModifyMode} />
      ))}
    </CardsWrapper>
  );
};

export default MiniCards;
