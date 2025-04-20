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

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Scalars['Boolean']['output'];
  editTask?: Maybe<Task>;
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

export type Query = {
  __typename?: 'Query';
  getTasks?: Maybe<Array<Task>>;
  getsingletask?: Maybe<Task>;
  hello: Scalars['String']['output'];
};


export type QueryGetsingletaskArgs = {
  id: Scalars['Int']['input'];
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

export type GetsingletaskQueryVariables = Exact<{
  getsingletaskId: Scalars['Int']['input'];
}>;


export type GetsingletaskQuery = { __typename?: 'Query', getsingletask?: { __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string } | null };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks?: Array<{ __typename?: 'Task', id: number, title: string, isComplete: boolean, priority: string, created: string, updated: string }> | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


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