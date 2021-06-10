import React from "react";
import Fire from "public/fire.svg";
import { FireBarWrapper } from "./Firebar.style";

interface FireBarProps {
  voteCountA: number;
  voteCountB: number;
}

const FireBar: React.FC<FireBarProps> = ({ voteCountA, voteCountB }) => {
  let leftBarPos = 50;
  let rightBarPos = 50;
  if (voteCountA !== 0) {
    if (voteCountB !== 0) {
      leftBarPos = (voteCountA / (voteCountA + voteCountB)) * 100;
      rightBarPos = 100 - rightBarPos;
    } else {
      leftBarPos = 100;
      rightBarPos = 0;
    }
  } else if (voteCountB !== 0) {
    leftBarPos = 0;
    rightBarPos = 100;
  }

  return (
    <FireBarWrapper>
      <div className="fire" style={{ left: `${leftBarPos}%` }}>
        <div className="fire__rectangle">{voteCountA}</div>
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
        <div className="fire__rectangle">{voteCountB}</div>
      </div>
      <div className="line" style={{ width: `${leftBarPos}%` }} />
      <div className="line" style={{ width: `${rightBarPos}%` }} />
    </FireBarWrapper>
  );
};

export default FireBar;
