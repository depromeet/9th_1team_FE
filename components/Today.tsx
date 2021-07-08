import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_GAME, GET_GAME_NOT_LOGIN, NEXT_GAME_BY_RANDOM_QUERY } from "lib/queries";
import { useEffect } from "react";
import styled from "styled-components";
import FeedPost from "./FeedPost/FeedPost";
import Loading from "./Loading/Loading";

interface TodayProps {
  isLoggedin: boolean;
  updateLoading: boolean;
  setUpdateLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
// 일단 랜덤으로

const Today: React.FC<TodayProps> = ({ isLoggedin, updateLoading, setUpdateLoading }) => {
  const { data: nextGameData } = useQuery(NEXT_GAME_BY_RANDOM_QUERY);
  const id = nextGameData?.nextGameByRandom?.id;

  const [getTodayGame, { data }] = useLazyQuery(isLoggedin ? GET_GAME : GET_GAME_NOT_LOGIN, {
    variables: { id },
  });

  if (data) console.log("asdf-->>", data.balanceGame);

  useEffect(() => {
    getTodayGame();
  }, []);

  return (
    <TodayContainer>
      {data ? (
        <>
          <div className='today__title'>오늘의 밸런스게임</div>
          <FeedPost
            updateLoading={updateLoading}
            setUpdateLoading={setUpdateLoading}
            data={data.balanceGame}
          />
        </>
      ) : (
        <Loading height={41} />
      )}
    </TodayContainer>
  );
};

export default Today;

export const TodayContainer = styled.div`
  min-height: 41rem;
  padding: 1.6rem;
  margin-bottom: -2.5rem;
  background: #f8f9fa;
  .today__title {
    font-family: "NanumSquareRound";
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
`;
