import _ from "lodash";
import React from "react";
import styled from "styled-components";
import MiniCard from "./MiniCard";
import { ContentContainer } from "./NotLogin.style";

type ListProps = {
  list: { id: string; commentCount: number; totalVoteCount: number }[];
  isModifyMode: Boolean;
};

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;

const MiniCards: React.FC<ListProps> = ({
  list = [],
  isModifyMode = false,
}) => {
  if (_.isEmpty(list))
    return (
      <ContentContainer>
        <img src="img.png" alt="" />
        로그인 후 <br />
        밸런스 게임을 만들어보세요!
      </ContentContainer>
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
