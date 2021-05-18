import React from "react";
import styled from "styled-components";
import MiniCard from "./MiniCard";

const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
`;

const MiniCards = () => {
  return (
    <CardsWrapper>
      {items.map((item) => (
        <MiniCard key={item.id} />
      ))}
    </CardsWrapper>
  );
};

export default MiniCards;
