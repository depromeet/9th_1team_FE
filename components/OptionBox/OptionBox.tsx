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
  const [mCreateVoteLogined] = useMutation(CREATE_VOTE_LOGINED);
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
      if (checkedId === null) {
        // 새로 create
        setCheckedId(selectionId);
        await mCreateVoteLogined({
          variables: {
            balanceGameId: postId,
            balanceGameSelectionId: selectionId,
          },
        });
      } else {
        // remove
        setCheckedId(null);
        await mRemoveVoteLogined({
          variables: {
            balanceGameId: postId,
          },
        });
        if (checkedId !== selectionId) {
          // 다른걸로 변경
          setCheckedId(selectionId);
          await mCreateVoteLogined({
            variables: {
              balanceGameId: postId,
              balanceGameSelectionId: selectionId,
            },
          });
        }
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
    await load();
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
