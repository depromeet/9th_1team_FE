import { gql } from "@apollo/client";

export const CREATE_VOTE_LOGINED = gql`
  mutation createVoteLogined(
    $balanceGameId: String!
    $balanceGameSelectionId: String!
  ) {
    createVoteLogined(
      createBalanceGameSelectionVoteInput: {
        balanceGameId: $balanceGameId
        balanceGameSelectionId: $balanceGameSelectionId
      }
    ) {
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
`;

export const CREATE_VOTE_NOT_LOGINED = gql`
  mutation createVoteNotLogined(
    $balanceGameId: String!
    $balanceGameSelectionId: String!
  ) {
    createVoteNotLogined(
      createBalanceGameSelectionVoteInput: {
        balanceGameId: $balanceGameId
        balanceGameSelectionId: $balanceGameSelectionId
      }
    ) {
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
`;

export const REMOVE_VOTE_LOGINED = gql`
  mutation removeVoteLogined($balanceGameId: String!) {
    removeVoteLogined(balanceGameId: $balanceGameId) {
      id
    }
  }
`;
