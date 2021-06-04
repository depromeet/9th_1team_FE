import { gql } from "@apollo/client";

export const typeDefs = gql`
  type UserProfile {
    id: String!
    email: String!
    nickname: String!
    userImage: String!
    level: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  # A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  scalar DateTime

  type BalanceGameSelection {
    id: String!
    balanceGameId: String!
    description: String!
    textColor: String!
    backgroundColor: String!
    backgroundImage: String!
    order: Float!
    voteCount: Float!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    balanceGame: BalanceGame!
    balanceGameSelectionVotes: [BalanceGameSelectionVote!]!
  }

  type BalanceGameSelectionVote {
    id: String!
    userId: String
    balanceGameId: String!
    balanceGameSelectionId: String!
    voteCount: Float!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User
    balanceGame: BalanceGame!
    balanceGameSelection: BalanceGameSelection!
  }

  type BalanceGameThumb {
    id: String!
    userId: String!
    balanceGameId: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    balanceGame: BalanceGame!
  }

  type Reply {
    id: String!
    userId: String!
    balanceGameId: String!
    commentId: String!
    color: String
    content: String!

    # delete 면 삭제된 댓글
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    balanceGame: BalanceGame!
    comment: Comment!
    notifications: [Notification!]!
  }

  type Comment {
    id: String!
    userId: String!
    balanceGameId: String!
    color: String
    content: String!

    # delete 면 삭제된 댓글
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    balanceGame: BalanceGame!
    replies: [Reply!]!
    notifications: [Notification!]!
  }

  type Notification {
    id: String!

    # new comment || new reply
    kind: String!
    balanceGameId: String!
    userForId: String!
    userFromId: String!
    userFromNickname: String!
    commentId: String
    commentContent: String
    replyId: String
    replyContent: String

    #  unread || red
    status: String!
    createdAt: DateTime!
    balanceGame: BalanceGame!
    user: User!
    comment: Comment!
    reply: Reply!
  }

  type User {
    id: String!
    socialId: String!
    platformType: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    profile: UserProfile!
    balanceGames: [BalanceGame!]!
    balanceGameSelectionVotes: [BalanceGameSelectionVote!]!
    balanceGameThumbs: [BalanceGameThumb!]!
    notifications: [Notification!]!
    comments: [Comment!]!
    replies: [Reply!]!
  }

  type BalanceGame {
    id: String!
    userId: String!
    balanceGameSelectionVotesCount: Float!
    description: String!
    totalVoteCount: Int!
    commentCount: Int!
    thumbs: Int!
    status: String!
    mySelection: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    balanceGameSelections: [BalanceGameSelection!]!
    balanceGameSelectionVotes: [BalanceGameSelectionVote!]!
    balanceGameThumbs: [BalanceGameThumb!]!
    balanceGameKeywords: [BalanceGameKeyword!]!
    notifications: [Notification!]!
    comments: [Comment!]!
  }

  type BalanceGameKeyword {
    id: String!
    name: String!
    balanceGameId: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    balanceGame: BalanceGame!
  }

  type BalanceGameList {
    # 전체 밸런스게임 수
    num: Float!
    balanceGame: [BalanceGame!]!
  }

  type File {
    # Example field (placeholder)
    exampleField: Int!
  }

  type Recipe {
    id: String!
    title: String!
    description: String
  }

  type LoginUserOutput {
    jwt: String!
    email: String!

    # 가입한 적이 없으면 REGISTER, 가입한 user는 LOGIN
    status: String!
  }

  type Query {
    recipes: [Recipe!]!
    mypage: User!
    users: [User!]!

    # 밸런스 게임 list 형태로 return
    balanceGames(balanceGamesState: BalanceGamesStateInput): BalanceGameList!

    # 로그인한 경우 투표한 게임의 선택과 밸런스 게임 list 형태로 return
    balanceGamesLogined(
      balanceGamesState: BalanceGamesStateInput
    ): BalanceGameList!
    myGames: BalanceGameList!
    balanceGamesTEST: [BalanceGame!]!
    balanceGameLogined(id: String!): BalanceGame!
    balanceGameNotLogined(id: String!): BalanceGame!
    nextGameByRandom: BalanceGame!
    myVotedGames: [BalanceGame!]!
    balanceGameKeywords: [BalanceGameKeyword!]!
    balanceGameKeyword(id: Int!): BalanceGameKeyword!
    balanceGameSelection(id: Int!): BalanceGameSelection!
    balanceGameSelectionVotes: [BalanceGameSelectionVote!]!
    balanceGameSelectionVote(id: Int!): BalanceGameSelectionVote!
    file(id: Int!): File!
    balanceGameThumbs: [BalanceGameThumb!]!
    balanceGameThumb(id: Int!): BalanceGameThumb!
    commentsByGameId(gameId: String!): [Comment!]!
    myNotifications: [Notification!]!
  }

  input BalanceGamesStateInput {
    # 밸런스 게임 나오는 갯수
    limit: Float!

    # skip할 밸런스 게임 갯수(현재 웹에 나와있는 밸런스 게임 갯수 넣으시면 됩니다.
    offset: Float!
  }

  type Mutation {
    create(newRecipeData: NewRecipeInput!): Recipe!
    createUser(createUserInput: CreateUserInput!): User!
    login(loginUserInput: LoginUserInput!): LoginUserOutput!
    setProfile(setProfileInput: SetProfileInput!): UserProfile!
    createUserProfile(
      createUserProfileInput: CreateUserProfileInput!
    ): UserProfile!
    createBalanceGame(
      createBalanceGameInput: CreateBalanceGameInput!
      file2: Upload!
      file1: Upload!
    ): BalanceGame!
    uploadFile(file1: Upload!): Boolean!
    updateBalanceGame(
      updateBalanceGameInput: UpdateBalanceGameInput!
    ): BalanceGame!
    removeBalanceGame(id: String!): Boolean!
    createBalanceGameKeyword(
      createBalanceGameKeywordInput: CreateBalanceGameKeywordInput!
    ): BalanceGameKeyword!
    createBalanceGameSelection(
      createBalanceGameSelectionInput: CreateBalanceGameSelectionInput!
    ): BalanceGameSelection!
    createVoteLogined(
      createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput!
    ): BalanceGame!
    createVoteNotLogined(
      createBalanceGameSelectionVoteInput: CreateBalanceGameSelectionVoteInput!
    ): BalanceGame!
    updateVoteLogined(
      updateBalanceGameSelectionVoteInput: UpdateBalanceGameSelectionVoteInput!
    ): BalanceGame!
    removeVoteLogined(balanceGameId: String!): BalanceGame!
    createFile(createFileInput: CreateFileInput!): File!
    updateFile(updateFileInput: UpdateFileInput!): File!
    removeFile(id: Int!): File!
    createBalanceGameThumb(
      createBalanceGameThumbInput: CreateBalanceGameThumbInput!
    ): BalanceGameThumb!
    createComment(createCommentInput: CreateCommentInput!): Comment!
    updateComment(updateCommentInput: UpdateCommentInput!): Comment!
    removeComment(id: String!): Boolean!
    readNoti(id: String!): Boolean!
    createReply(createReplyInput: CreateReplyInput!): Reply!
    updateReply(updateReplyInput: UpdateReplyInput!): Reply!
    removeReply(replyId: String!): Boolean!
  }

  input NewRecipeInput {
    title: String!
    description: String
  }

  input CreateUserInput {
    socialId: String!
    platformType: String
    profile: CreateUserProfileInput!
  }

  input CreateUserProfileInput {
    email: String!
    nickname: String!
    userImage: String!
  }

  input LoginUserInput {
    socialKey: String!

    # kakao or naver
    socialType: String!
  }

  input SetProfileInput {
    nickname: String!
    email: String!
  }

  input CreateBalanceGameInput {
    description: String!
    balanceGameSelections: [CreateBalanceGameSelectionInput!]!
    balanceGameKeywords: [CreateBalanceGameKeywordInput!]!
  }

  input CreateBalanceGameSelectionInput {
    balanceGameId: String
    description: String!
    textColor: String
    backgroundColor: String
    backgroundImage: String
    order: Float!
  }

  input CreateBalanceGameKeywordInput {
    name: String!
    balanceGameId: String
  }

  # The \`Upload\` scalar type represents a file upload.
  scalar Upload

  input UpdateBalanceGameInput {
    balanceGameId: String!
    description: String
    balanceGameSelections: [UpdateBalanceGameSelectionInput!]
    balanceGameKeywords: [CreateBalanceGameKeywordInput!]
  }

  input UpdateBalanceGameSelectionInput {
    id: String!
    description: String
    textColor: String
    backgroundColor: String
    backgroundImage: String
    order: Float
  }

  input CreateBalanceGameSelectionVoteInput {
    balanceGameId: String!
    balanceGameSelectionId: String!
  }

  input UpdateBalanceGameSelectionVoteInput {
    balanceGameId: String!
    newBalanceGameSelectionId: String!
  }

  input CreateFileInput {
    # Example field (placeholder)
    exampleField: Int!
  }

  input UpdateFileInput {
    # Example field (placeholder)
    exampleField: Int
    id: Int!
  }

  input CreateBalanceGameThumbInput {
    userId: String!
    balanceGameId: String!
  }

  input CreateCommentInput {
    balanceGameId: String
    content: String!
    color: String
  }

  input UpdateCommentInput {
    id: String!
    content: String!
  }

  input CreateReplyInput {
    balanceGameId: String!
    commentId: String!
    content: String!
    color: String
  }

  input UpdateReplyInput {
    replyId: String!
    content: String!
  }
`;
