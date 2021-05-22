import React from "react";
import styled from "styled-components";
import MiniCard from "./MiniCard";

type ListProps = {
  list: { id: string }[];
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
  return (
    <CardsWrapper>
      {list.map((item) => (
        <MiniCard key={item.id} item={item} isModifyMode={isModifyMode} />
      ))}
    </CardsWrapper>
  );
};

export default MiniCards;
