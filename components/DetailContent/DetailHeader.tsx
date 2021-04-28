import React from "react";
import styled from "styled-components";

const DetailHeaderWrapper = styled.header`
  border-bottom: 1px solid black;
`;

const DetailHeader = () => {
  return (
    <DetailHeaderWrapper>
      <div>header</div>
    </DetailHeaderWrapper>
  );
};

export default DetailHeader;
