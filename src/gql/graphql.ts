/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Auth0User = {
  __typename?: 'Auth0User';
  created_at?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  last_ip?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  logins_count?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  auth0_id: Scalars['String'];
  auth0_refresh_token?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass: Class;
  createUser: User;
  editClass: Class;
  removeClass?: Maybe<Class>;
};


export type MutationCreateClassArgs = {
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditClassArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationRemoveClassArgs = {
  id: Scalars['ID'];
};

export type OperationLog = {
  __typename?: 'OperationLog';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  operation: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  auth0users: Array<Auth0User>;
  classes: Array<Class>;
  info: Scalars['String'];
  logs?: Maybe<Array<Maybe<OperationLog>>>;
  logsByUser?: Maybe<Array<Maybe<OperationLog>>>;
  me: User;
  userByAuth0ID: User;
  users: Array<User>;
};


export type QueryAuth0usersArgs = {
  q?: InputMaybe<Scalars['String']>;
};


export type QueryLogsArgs = {
  operation?: InputMaybe<Scalars['String']>;
};


export type QueryLogsByUserArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserByAuth0IdArgs = {
  auth0_id?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  auth0_id: Scalars['String'];
  auth0_refresh_token?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ClassListQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassListQuery = { __typename?: 'Query', classes: Array<{ __typename?: 'Class', name: string, id: string }> };


export const ClassListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ClassList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ClassListQuery, ClassListQueryVariables>;