import React, { Dispatch, SetStateAction, useEffect } from "react";
import Unselect from "public/unselect.svg";
import Select from "public/select.svg";
import { parseCookies } from "nookies";
import { OptionBoxContainer } from "./OptionBox.style";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import {
  CREATE_VOTE_LOGINED,
  CREATE_VOTE_NOT_LOGINED,
  REMOVE_VOTE_LOGINED,
} from "lib/mutations";

interface OptionBoxProps {
  loadGame?: (
    variables?:
      | Partial<{
          id: string;
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>> | undefined;

  loadGameFeed?:
    | ((
        variables?: Partial<Record<string, any>> | undefined
      ) => Promise<ApolloQueryResult<any>>)
    | undefined;
  selection: any;
  postId: string;
  checkedId: string | null;
  setCheckedId: Dispatch<SetStateAction<string | null>>;
  setIsVoted: Dispatch<SetStateAction<boolean>>;
}

const OptionBox = ({
  loadGame,
  loadGameFeed,
  selection,
  checkedId,
  postId,
  setCheckedId,
  setIsVoted,
}: OptionBoxProps) => {
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED, {
    onCompleted: votedCompleted,
  });
  function votedCompleted(data: any) {
    console.log("votedCompleted data -->>", data);

    // 투표한 곳의 id를 index페이지에서 받는 data의 id와 같다면 정보 업데이트
    load();
  }
  const [mCreateVoteNotLogined] = useMutation(CREATE_VOTE_NOT_LOGINED);
  const [mRemoveVoteLogined] = useMutation(REMOVE_VOTE_LOGINED);

  const { token } = parseCookies();

  useEffect(() => {
    console.log("OptionBox");
  }, []);

  useEffect(() => {
    const checkedList = localStorage.getItem("checkedList")?.split(",");
    checkedList?.forEach((item) => {
      if (item === selection.id) setCheckedId(item);
    });
  }, []);

  const handleVote = async (selectionId: string) => {
    setIsVoted(true);
    // 로그인이면
    if (token) {
      // 기존 선택한 값이 없으면서 새로 선택한 경우 투표
      if (checkedId === null && selectionId !== null) {
        setCheckedId(selectionId);
        await mCreateVoteLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      } else if (checkedId === selectionId) {
        // 기존 선택한 것과 새로 선택한게 같을 경우 투표 취소
        setCheckedId(null);
        await mRemoveVoteLogined({
          variables: {
            balanceGameId: postId,
          },
        });
      } else if (checkedId !== null && selectionId !== null) {
        // 기존 선택한 값이 있으면서 다시 선택한 경우 삭제 후 투표
        setCheckedId(selectionId);
        await mRemoveVoteLogined({
          variables: {
            balanceGameId: postId,
          },
        });
        await mCreateVoteLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      }
    } else {
      const checkedList =
        (localStorage.getItem("checkedList")?.split(",") as string[]) || [];
      if (checkedId === null) {
        // 새로 create
        setCheckedId(selectionId);
        checkedList?.push(selectionId);
        await mCreateVoteNotLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      } else {
        // remove
        setCheckedId(null);
        for (let i = 0; i < checkedList.length; i++) {
          if (checkedList[i] === checkedId) {
            checkedList.splice(i, 1);
            i--;
          }
        }
        checkedList?.reduce;
        if (checkedId !== selectionId) {
          // 다른걸로 변경
          setCheckedId(selectionId);
          checkedList?.push(selectionId);
          await mCreateVoteNotLogined({
            variables: {
              balanceGameId: postId,
              balanceGameSelectionId: selectionId,
            },
          });
        }
      }
      localStorage.setItem("checkedList", checkedList.toString());
    }
    // await load();
    // game 두번 로드하는 것 같은데, 수정 필요
    await setIsVoted(false);
  };

  const load = () => {
    if (loadGame) {
      console.log("loadGame있음");
      loadGame();
    } else if (loadGameFeed) {
      console.log("loadGameFeed 있음");
      loadGameFeed();
    } else return;
  };

  const isChecked =
    checkedId === null ? null : checkedId === selection.id ? true : false;

  return (
    <OptionBoxContainer
      {...{ isChecked }}
      style={{
        background: selection.backgroundColor,
        color: selection.textColor,
        backgroundImage: `url("${selection.backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="checkbox" onClick={() => handleVote(selection.id)}>
        {isChecked ? <Select /> : <Unselect />}
      </div>
      <div className="title">{selection.description}</div>
    </OptionBoxContainer>
  );
};

export default OptionBox;
