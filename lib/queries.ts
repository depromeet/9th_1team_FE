import { gql } from "@apollo/client";

export const MY_GAMES = gql`
  query myGames {
    myGames {
      balanceGames: balanceGame {
        id
        totalVoteCount
        commentCount
        balanceGameSelections {
          order
          description
          backgroundColor
          backgroundImage
          textColor
        }
      }
    }
  }
`;

export const GET_GAME = gql`
  query balanceGameLogined($id: String!) {
    balanceGame: balanceGameLogined(id: $id) {
      id
      userId
      description
      mySelection
      commentCount
      createdAt
      user {
        profile {
          nickname
        }
      }
      balanceGameSelections {
        id
        order
        voteCount
        balanceGameId
        backgroundImage
        backgroundColor
        textColor
        description
      }
    }
  }
`;

export const GET_GAME_NOT_LOGIN = gql`
  query balanceGameNotLogined($id: String!) {
    balanceGame: balanceGameNotLogined(id: $id) {
      id
      userId
      description
      mySelection
      commentCount
      createdAt
      user {
        profile {
          nickname
        }
      }
      balanceGameSelections {
        id
        order
        balanceGameId
        backgroundImage
        backgroundColor
        textColor
        description
      }
    }
  }
`;

export const NEXT_GAME_BY_RANDOM_QUERY = gql`
  query nextGameByRandom {
    nextGameByRandom {
      id
    }
  }
`;

export const BALANCE_GAMES_TICK = 5;

export const BALANCE_GAMES_QUERY = gql`
  query balanceGames($offset: Float!) {
    balanceGames(
      balanceGamesState: { limit: ${BALANCE_GAMES_TICK}, offset: $offset }
    ) {
      num
      balanceGames: balanceGame {
        id
        userId
        balanceGameSelectionVotesCount
        description
        totalVoteCount
        commentCount
        thumbs
        status
        mySelection
        createdAt
        updatedAt
        balanceGameSelections {
          id
          order
          status
          description
          backgroundColor
          backgroundImage
          textColor
          voteCount
        }
      }
    }
  }
`;
export const BALANCE_GAMES_LOGINED_QUERY = gql`
  query balanceGamesLogined($offset: Float!) {
    balanceGames: balanceGamesLogined(
      balanceGamesState: { limit: ${BALANCE_GAMES_TICK}, offset: $offset }
    ) {
      num
      balanceGames: balanceGame {
        id
        userId
        balanceGameSelectionVotesCount
        description
        totalVoteCount
        commentCount
        thumbs
        status
        mySelection
        createdAt
        updatedAt
        balanceGameSelections {
          id
          order
          status
          description
          voteCount
          backgroundColor
          backgroundImage
          textColor
        }
      }
    }
  }
`;
