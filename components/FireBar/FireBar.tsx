import React, { useEffect } from "react";
import Fire from "public/fire.svg";
import { FireBarWrapper } from "./FireBar.style";

interface FireBarProps {
  voteCountA: number;
  voteCountB: number;
  fistColor?: string;
  secondColor?: string;
  checkedId?: string | null;
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
  //let cntA = voteCountA;
  //let cntB = voteCountB;

  // isVoted는 삭제 해야할듯
  // if (isVoted) {
  //   if (checkedId === idA) {
  //     cntA++;
  //     console.log("cntA", cntA);
  //   } else if (checkedId === idB) {
  //     cntB++;
  //     console.log("cntB", cntB);
  //   }
  // }

  if (voteCountA !== 0) {
    if (voteCountB !== 0) {
      leftBarPos = (voteCountA / (voteCountA + voteCountB)) * 100;
      rightBarPos = 100 - leftBarPos;
    } else {
      leftBarPos = 100;
      rightBarPos = 0;
    }
  } else if (voteCountB !== 0) {
    leftBarPos = 0;
    rightBarPos = 100;
  }

  // if (voteCountA !== 0) {
  //   if (voteCountB !== 0) {
  //     leftBarPos = (voteCountA / (voteCountA + voteCountB)) * 100;
  //     rightBarPos = 100 - leftBarPos;
  //   } else {
  //     leftBarPos = 100;
  //     rightBarPos = 0;
  //   }
  // } else if (voteCountB !== 0) {
  //   leftBarPos = 0;
  //   rightBarPos = 100;
  // }

  // if (cntA !== 0) {
  //   if (cntB !== 0) {
  //     leftBarPos = (cntA / (cntA + cntB)) * 100;
  //     rightBarPos = 100 - leftBarPos;
  //   } else {
  //     leftBarPos = 100;
  //     rightBarPos = 0;
  //   }
  // } else if (cntB !== 0) {
  //   leftBarPos = 0;
  //   rightBarPos = 100;
  // }

  return (
    <FireBarWrapper>
      <div className="fire" style={{ left: `${leftBarPos}%` }}>
        <div className="fire__rectangle" style={{ color: fistColor }}>
          {Math.round(leftBarPos)}
        </div>
        <div
          style={{
            position: "absolute",
            top: "-2.5rem",
            left: "-2.1rem",
            zIndex: 3,
          }}
        >
          {voteCountA !== 0 && voteCountB !== 0 && <Fire />}
        </div>
        <div className="fire__rectangle" style={{ color: secondColor }}>
          {100 - Math.round(leftBarPos)}
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
