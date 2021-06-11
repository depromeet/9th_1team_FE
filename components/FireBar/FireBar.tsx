import React from "react";
import Fire from "public/fire.svg";
import { FireBarWrapper } from "./Firebar.style";

interface FireBarProps {
  voteCountA: number;
  voteCountB: number;
  fistColor?: string;
  secondColor?: string;
  checkedId: string;
  idA: string;
  idB: string;
  isVoted: boolean;
}

const FireBar: React.FC<FireBarProps> = ({
  voteCountA,
  voteCountB,
  fistColor,
  secondColor,
  checkedId,
  idA,
  idB,
  isVoted,
}) => {
  let leftBarPos = 50;
  let rightBarPos = 50;
  let cntA = voteCountA;
  let cntB = voteCountB;
  if (isVoted) {
    if (checkedId === idA) {
      cntA++;
      if (cntB !== 0) cntB--;
    } else if (checkedId === idB) {
      if (cntA !== 0) cntA--;
      cntB++;
    }
  }

  if (cntA !== 0) {
    if (cntB !== 0) {
      leftBarPos = (cntA / (cntA + cntB)) * 100;
      rightBarPos = 100 - leftBarPos;
    } else {
      leftBarPos = 100;
      rightBarPos = 0;
    }
  } else if (cntB !== 0) {
    leftBarPos = 0;
    rightBarPos = 100;
  }

  return (
    <FireBarWrapper>
      <div className="fire" style={{ left: `${leftBarPos}%` }}>
        <div className="fire__rectangle" style={{ color: fistColor }}>
          {cntA}
        </div>
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
        <div className="fire__rectangle" style={{ color: secondColor }}>
          {cntB}
        </div>
      </div>
      <div
        className="line"
        style={{ width: `${leftBarPos}%`, background: fistColor }}
      />
      <div
        className="line"
        style={{ width: `${rightBarPos}%`, background: secondColor }}
      />
    </FireBarWrapper>
  );
};

export default FireBar;
