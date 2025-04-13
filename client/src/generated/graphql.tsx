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
  title: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditTaskArgs = {
  id: Scalars['Int']['input'];
  isComplete: Scalars['Boolean']['input'];
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
  title: Scalars['String']['output'];
  updated: Scalars['String']['output'];
};

export type CreatetaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreatetaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', title: string, id: number, isComplete: boolean, updated: string, created: string } };

export type DeletetaskMutationVariables = Exact<{
  deleteTaskId: Scalars['Int']['input'];
}>;


export type DeletetaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type EditTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  isComplete: Scalars['Boolean']['input'];
  editTaskId: Scalars['Int']['input'];
}>;


export type EditTaskMutation = { __typename?: 'Mutation', editTask?: { __typename?: 'Task', title: string, created: string, isComplete: boolean, id: number, updated: string } | null };

export type GetsingletaskQueryVariables = Exact<{
  getsingletaskId: Scalars['Int']['input'];
}>;


export type GetsingletaskQuery = { __typename?: 'Query', getsingletask?: { __typename?: 'Task', isComplete: boolean, title: string, updated: string, id: number, created: string } | null };

export type GettasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GettasksQuery = { __typename?: 'Query', getTasks?: Array<{ __typename?: 'Task', created: string, id: number, isComplete: boolean, title: string, updated: string }> | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const CreatetaskDocument = gql`
    mutation createtask($title: String!) {
  createTask(title: $title) {
    title
    id
    isComplete
    updated
    created
  }
}
    `;
export type CreatetaskMutationFn = Apollo.MutationFunction<CreatetaskMutation, CreatetaskMutationVariables>;

/**
 * __useCreatetaskMutation__
 *
 * To run a mutation, you first call `useCreatetaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatetaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createtaskMutation, { data, loading, error }] = useCreatetaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreatetaskMutation(baseOptions?: Apollo.MutationHookOptions<CreatetaskMutation, CreatetaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatetaskMutation, CreatetaskMutationVariables>(CreatetaskDocument, options);
      }
export type CreatetaskMutationHookResult = ReturnType<typeof useCreatetaskMutation>;
export type CreatetaskMutationResult = Apollo.MutationResult<CreatetaskMutation>;
export type CreatetaskMutationOptions = Apollo.BaseMutationOptions<CreatetaskMutation, CreatetaskMutationVariables>;
export const DeletetaskDocument = gql`
    mutation deletetask($deleteTaskId: Int!) {
  deleteTask(id: $deleteTaskId)
}
    `;
export type DeletetaskMutationFn = Apollo.MutationFunction<DeletetaskMutation, DeletetaskMutationVariables>;

/**
 * __useDeletetaskMutation__
 *
 * To run a mutation, you first call `useDeletetaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletetaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletetaskMutation, { data, loading, error }] = useDeletetaskMutation({
 *   variables: {
 *      deleteTaskId: // value for 'deleteTaskId'
 *   },
 * });
 */
export function useDeletetaskMutation(baseOptions?: Apollo.MutationHookOptions<DeletetaskMutation, DeletetaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletetaskMutation, DeletetaskMutationVariables>(DeletetaskDocument, options);
      }
export type DeletetaskMutationHookResult = ReturnType<typeof useDeletetaskMutation>;
export type DeletetaskMutationResult = Apollo.MutationResult<DeletetaskMutation>;
export type DeletetaskMutationOptions = Apollo.BaseMutationOptions<DeletetaskMutation, DeletetaskMutationVariables>;
export const EditTaskDocument = gql`
    mutation editTask($title: String!, $isComplete: Boolean!, $editTaskId: Int!) {
  editTask(title: $title, isComplete: $isComplete, id: $editTaskId) {
    title
    created
    isComplete
    id
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
    query getsingletask($getsingletaskId: Int!) {
  getsingletask(id: $getsingletaskId) {
    isComplete
    title
    updated
    id
    created
    isComplete
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
export const GettasksDocument = gql`
    query gettasks {
  getTasks {
    created
    id
    isComplete
    title
    updated
  }
}
    `;

/**
 * __useGettasksQuery__
 *
 * To run a query within a React component, call `useGettasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGettasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGettasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGettasksQuery(baseOptions?: Apollo.QueryHookOptions<GettasksQuery, GettasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GettasksQuery, GettasksQueryVariables>(GettasksDocument, options);
      }
export function useGettasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GettasksQuery, GettasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GettasksQuery, GettasksQueryVariables>(GettasksDocument, options);
        }
export function useGettasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GettasksQuery, GettasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GettasksQuery, GettasksQueryVariables>(GettasksDocument, options);
        }
export type GettasksQueryHookResult = ReturnType<typeof useGettasksQuery>;
export type GettasksLazyQueryHookResult = ReturnType<typeof useGettasksLazyQuery>;
export type GettasksSuspenseQueryHookResult = ReturnType<typeof useGettasksSuspenseQuery>;
export type GettasksQueryResult = Apollo.QueryResult<GettasksQuery, GettasksQueryVariables>;
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