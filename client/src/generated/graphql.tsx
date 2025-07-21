import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Scalars['Boolean']['output'];
  editTask?: Maybe<Task>;
  login: User;
  logout: Scalars['Boolean']['output'];
  register: User;
};


export type MutationCreateTaskArgs = {
  priority: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditTaskArgs = {
  id: Scalars['Int']['input'];
  isComplete: Scalars['Boolean']['input'];
  priority?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  getTasks?: Maybe<Array<Task>>;
  getsingletask?: Maybe<Task>;
  hello: Scalars['String']['output'];
  me?: Maybe<User>;
};


export type QueryGetsingletaskArgs = {
  id: Scalars['Int']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  created: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isComplete: Scalars['Boolean']['output'];
  priority: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  created: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updated: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateTaskMutationVariables = Exact<{
  priority: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string } };

export type DeleteMutationVariables = Exact<{
  deleteTaskId: Scalars['Int']['input'];
}>;


export type DeleteMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type EditTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  isComplete: Scalars['Boolean']['input'];
  editTaskId: Scalars['Int']['input'];
  priority?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditTaskMutation = { __typename?: 'Mutation', editTask?: { __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string } | null };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, email: string, username: string, created: string, updated: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, email: string, username: string, created: string, updated: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetsingletaskQueryVariables = Exact<{
  getsingletaskId: Scalars['Int']['input'];
}>;


export type GetsingletaskQuery = { __typename?: 'Query', getsingletask?: { __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string } | null };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks?: Array<{ __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string }> | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string, username: string, created: string, updated: string } | null };


export const CreateTaskDocument = gql`
    mutation CreateTask($priority: String!, $title: String!) {
  createTask(priority: $priority, title: $title) {
    id
    title
    isComplete
    priority
    created
    updated
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      priority: // value for 'priority'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteDocument = gql`
    mutation delete($deleteTaskId: Int!) {
  deleteTask(id: $deleteTaskId)
}
    `;
export type DeleteMutationFn = Apollo.MutationFunction<DeleteMutation, DeleteMutationVariables>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      deleteTaskId: // value for 'deleteTaskId'
 *   },
 * });
 */
export function useDeleteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMutation, DeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMutation, DeleteMutationVariables>(DeleteDocument, options);
      }
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = Apollo.MutationResult<DeleteMutation>;
export type DeleteMutationOptions = Apollo.BaseMutationOptions<DeleteMutation, DeleteMutationVariables>;
export const EditTaskDocument = gql`
    mutation EditTask($title: String!, $isComplete: Boolean!, $editTaskId: Int!, $priority: String) {
  editTask(
    title: $title
    isComplete: $isComplete
    id: $editTaskId
    priority: $priority
  ) {
    id
    title
    isComplete
    priority
    created
    updated
  }
}
    `;
export type EditTaskMutationFn = Apollo.MutationFunction<EditTaskMutation, EditTaskMutationVariables>;

/**
 * __useEditTaskMutation__
 *
 * To run a mutation, you first call `useEditTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTaskMutation, { data, loading, error }] = useEditTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      isComplete: // value for 'isComplete'
 *      editTaskId: // value for 'editTaskId'
 *      priority: // value for 'priority'
 *   },
 * });
 */
export function useEditTaskMutation(baseOptions?: Apollo.MutationHookOptions<EditTaskMutation, EditTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTaskMutation, EditTaskMutationVariables>(EditTaskDocument, options);
      }
export type EditTaskMutationHookResult = ReturnType<typeof useEditTaskMutation>;
export type EditTaskMutationResult = Apollo.MutationResult<EditTaskMutation>;
export type EditTaskMutationOptions = Apollo.BaseMutationOptions<EditTaskMutation, EditTaskMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    id
    email
    username
    created
    updated
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    email
    username
    created
    updated
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetsingletaskDocument = gql`
    query Getsingletask($getsingletaskId: Int!) {
  getsingletask(id: $getsingletaskId) {
    id
    title
    isComplete
    priority
    created
    updated
  }
}
    `;

/**
 * __useGetsingletaskQuery__
 *
 * To run a query within a React component, call `useGetsingletaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetsingletaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetsingletaskQuery({
 *   variables: {
 *      getsingletaskId: // value for 'getsingletaskId'
 *   },
 * });
 */
export function useGetsingletaskQuery(baseOptions: Apollo.QueryHookOptions<GetsingletaskQuery, GetsingletaskQueryVariables> & ({ variables: GetsingletaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetsingletaskQuery, GetsingletaskQueryVariables>(GetsingletaskDocument, options);
      }
export function useGetsingletaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetsingletaskQuery, GetsingletaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetsingletaskQuery, GetsingletaskQueryVariables>(GetsingletaskDocument, options);
        }
export function useGetsingletaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetsingletaskQuery, GetsingletaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetsingletaskQuery, GetsingletaskQueryVariables>(GetsingletaskDocument, options);
        }
export type GetsingletaskQueryHookResult = ReturnType<typeof useGetsingletaskQuery>;
export type GetsingletaskLazyQueryHookResult = ReturnType<typeof useGetsingletaskLazyQuery>;
export type GetsingletaskSuspenseQueryHookResult = ReturnType<typeof useGetsingletaskSuspenseQuery>;
export type GetsingletaskQueryResult = Apollo.QueryResult<GetsingletaskQuery, GetsingletaskQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks {
  getTasks {
    id
    title
    isComplete
    priority
    created
    updated
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export function useHelloSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloSuspenseQueryHookResult = ReturnType<typeof useHelloSuspenseQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    created
    updated
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;