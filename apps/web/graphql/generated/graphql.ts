/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /** 8 bytes signed integer */
  Int8: { input: any; output: any; }
  /** A string representation of microseconds UNIX timestamp (16 digits) */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Condition = {
  __typename?: 'Condition';
  /** conditionId */
  id: Scalars['ID']['output'];
  payoutDenominator: Scalars['BigInt']['output'];
  /** payouts */
  payoutNumerators: Array<Scalars['BigInt']['output']>;
  /** tokenIds */
  positionIds: Array<Scalars['BigInt']['output']>;
};

export type Condition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Condition_Filter>>>;
  payoutDenominator?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_gt?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_gte?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutDenominator_lt?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_lte?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_not?: InputMaybe<Scalars['BigInt']['input']>;
  payoutDenominator_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payoutNumerators_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  positionIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Condition_OrderBy {
  Id = 'id',
  PayoutDenominator = 'payoutDenominator',
  PayoutNumerators = 'payoutNumerators',
  PositionIds = 'positionIds'
}

export type Fpmm = {
  __typename?: 'FPMM';
  /** conditionId */
  conditionId: Scalars['String']['output'];
  /** FPMM address */
  id: Scalars['ID']['output'];
};

export type Fpmm_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Fpmm_Filter>>>;
  conditionId?: InputMaybe<Scalars['String']['input']>;
  conditionId_contains?: InputMaybe<Scalars['String']['input']>;
  conditionId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  conditionId_ends_with?: InputMaybe<Scalars['String']['input']>;
  conditionId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  conditionId_gt?: InputMaybe<Scalars['String']['input']>;
  conditionId_gte?: InputMaybe<Scalars['String']['input']>;
  conditionId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  conditionId_lt?: InputMaybe<Scalars['String']['input']>;
  conditionId_lte?: InputMaybe<Scalars['String']['input']>;
  conditionId_not?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_contains?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  conditionId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  conditionId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  conditionId_starts_with?: InputMaybe<Scalars['String']['input']>;
  conditionId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Fpmm_Filter>>>;
};

export enum Fpmm_OrderBy {
  ConditionId = 'conditionId',
  Id = 'id'
}

export type NegRiskEvent = {
  __typename?: 'NegRiskEvent';
  /** negRiskMarketId */
  id: Scalars['ID']['output'];
  /** Question Count */
  questionCount: Scalars['Int']['output'];
};

export type NegRiskEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NegRiskEvent_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<NegRiskEvent_Filter>>>;
  questionCount?: InputMaybe<Scalars['Int']['input']>;
  questionCount_gt?: InputMaybe<Scalars['Int']['input']>;
  questionCount_gte?: InputMaybe<Scalars['Int']['input']>;
  questionCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  questionCount_lt?: InputMaybe<Scalars['Int']['input']>;
  questionCount_lte?: InputMaybe<Scalars['Int']['input']>;
  questionCount_not?: InputMaybe<Scalars['Int']['input']>;
  questionCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum NegRiskEvent_OrderBy {
  Id = 'id',
  QuestionCount = 'questionCount'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  condition?: Maybe<Condition>;
  conditions: Array<Condition>;
  fpmm?: Maybe<Fpmm>;
  fpmms: Array<Fpmm>;
  negRiskEvent?: Maybe<NegRiskEvent>;
  negRiskEvents: Array<NegRiskEvent>;
  userPosition?: Maybe<UserPosition>;
  userPositions: Array<UserPosition>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryConditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryConditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Condition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Condition_Filter>;
};


export type QueryFpmmArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFpmmsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Fpmm_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Fpmm_Filter>;
};


export type QueryNegRiskEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNegRiskEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NegRiskEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NegRiskEvent_Filter>;
};


export type QueryUserPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserPosition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserPosition_Filter>;
};

export type UserPosition = {
  __typename?: 'UserPosition';
  /** amount of token the user holds */
  amount: Scalars['BigInt']['output'];
  /** the avg price the user bought the token */
  avgPrice: Scalars['BigInt']['output'];
  /** User Address + Token ID */
  id: Scalars['ID']['output'];
  /** realized profits - losses */
  realizedPnl: Scalars['BigInt']['output'];
  /** Token ID */
  tokenId: Scalars['BigInt']['output'];
  /** total amount of token bought */
  totalBought: Scalars['BigInt']['output'];
  /** User Address */
  user: Scalars['String']['output'];
};

export type UserPosition_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<UserPosition_Filter>>>;
  avgPrice?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  avgPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  avgPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<UserPosition_Filter>>>;
  realizedPnl?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_gt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_gte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  realizedPnl_lt?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_lte?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_not?: InputMaybe<Scalars['BigInt']['input']>;
  realizedPnl_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBought?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBought_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBought_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum UserPosition_OrderBy {
  Amount = 'amount',
  AvgPrice = 'avgPrice',
  Id = 'id',
  RealizedPnl = 'realizedPnl',
  TokenId = 'tokenId',
  TotalBought = 'totalBought',
  User = 'user'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type PolymarketUserPositionsQueryVariables = Exact<{
  minRealizedPnl: Scalars['BigInt']['input'];
}>;


export type PolymarketUserPositionsQuery = { __typename?: 'Query', userPositions: Array<{ __typename?: 'UserPosition', id: string, realizedPnl: any, tokenId: any, totalBought: any, user: string, avgPrice: any, amount: any }> };


export const PolymarketUserPositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PolymarketUserPositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minRealizedPnl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BigInt"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"realizedPnl"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"realizedPnl_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minRealizedPnl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"realizedPnl"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"totalBought"}},{"kind":"Field","name":{"kind":"Name","value":"user"}},{"kind":"Field","name":{"kind":"Name","value":"avgPrice"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]} as unknown as DocumentNode<PolymarketUserPositionsQuery, PolymarketUserPositionsQueryVariables>;