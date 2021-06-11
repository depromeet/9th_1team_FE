import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import DetailFireBar from "components/FireBar/DetailFireBar";
import VS from "public/versus.svg";

const RadioWrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  .radio-box {
    position: relative;
    height: 143px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .radio-btn {
      position: absolute;
      display: inline-block;
      right: 0.7rem;
      top: 0.7rem;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/circle.svg");
    }
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + .radio-btn:before {
      content: "";
      position: absolute;
      right: 0.7px;
      top: 0.7px;
      width: 2.4rem;
      height: 2.4rem;
      background-image: url("/check-circle.svg");
    }
  }
  .first {
    background-color: #e56f53;
  }
  .second {
    background-color: #ffd569;
  }
  h2 {
    font-family: "NanumSquareRound";
    font-size: 2rem;
    font-weight: 800;
  }
`;

const BoxWrapper = styled.div`
  position: relative;
`;

const Versus = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface balanceType {
  id: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  textColor: string;
  voteCount: number;
}

interface RadioBoxProps {
  balanceGameId: string;
  balanceA: balanceType;
  balanceB: balanceType;
  onChange: (
    balanceGameId: string,
    balanceId: string
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isVoted: boolean;
}

const RadioBox: React.FC<RadioBoxProps> = ({
  balanceGameId,
  balanceA,
  balanceB,
  onChange,
  value,
  isVoted,
}) => {
  return (
    <RadioWrapper>
      <BoxWrapper>
        <div
          className="radio-box first"
          style={{
            position: "relative",
            backgroundImage: `url('${balanceA.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: balanceA.backgroundColor,
            color: balanceA.textColor,
          }}
        >
          <h2>{balanceA.description}</h2>

          <input
            name="balance"
            type="radio"
            id="choice-1"
            onChange={onChange(balanceGameId, balanceA.id)}
            checked={balanceA.id === value}
          />
          <label
            style={{ zIndex: 5 }}
            className="radio-btn"
            htmlFor="choice-1"
          ></label>
        </div>
        <div
          className="radio-box second"
          style={{
            backgroundImage: `url('${balanceB.backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: balanceB.backgroundColor,
            color: balanceB.textColor,
          }}
        >
          <h2>{balanceB.description}</h2>

          <input
            name="balance"
            type="radio"
            id="choice-2"
            onChange={onChange(balanceGameId, balanceB.id)}
            checked={balanceB.id === value}
          />
          <label
            style={{ zIndex: 5 }}
            className="radio-btn"
            htmlFor="choice-2"
          ></label>
        </div>
        <Versus>
          {!isVoted ? (
            <VS />
          ) : (
            <DetailFireBar
              idA={balanceA.id}
              idB={balanceB.id}
              voteCountA={balanceA.voteCount}
              voteCountB={balanceB.voteCount}
              isVoted={isVoted}
              fistColor={balanceA.backgroundColor}
              secondColor={balanceB.backgroundColor}
            />
          )}
        </Versus>
      </BoxWrapper>
    </RadioWrapper>
  );
};

export default RadioBox;
