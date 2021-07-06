import React, { ChangeEvent } from "react";
import DetailFireBar from "components/FireBar/DetailFireBar";
import VS from "public/versus.svg";
import { RadioWrapper, BoxWrapper, Versus } from './DetailContent.style'

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
  value: string | null;
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
