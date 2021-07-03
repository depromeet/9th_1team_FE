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