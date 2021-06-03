import React, { useCallback, useMemo } from 'react';
import { ApolloError, useQuery, gql } from '@apollo/client';
import { ISSUE_STATE } from '../../utils';
import { CommentsProps, IssueNode } from '../types';
import { MessageError } from '../message/message-error';

export const ISSUES_QUERY = gql`
  query IssuesList(
    $owner: String!
    $name: String!
    $state: [IssueState!]
    $cursor: String
    $pageSize: Int
  ) {
    repository(owner: $owner, name: $name) {
      issues(
        first: $pageSize
        states: $state
        orderBy: { field: UPDATED_AT, direction: DESC }
        after: $cursor
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            number
            title
            author {
              login
            }
            state
            createdAt
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export interface ChildrenProps {
  onLoadMore: () => void;
  loading: boolean;
  error: ApolloError | undefined;
  issues: { edges: IssueNode[] };
  hasNextPage: boolean;
}

export interface IssuesLoaderProps {
  owner: string;
  name: string;
  state: ISSUE_STATE.OPEN | ISSUE_STATE.CLOSED;
  pageSize?: number;
  children: React.ComponentType<ChildrenProps> | null;
}

export const IssuesLoader = ({
  children: Children,
  owner,
  name,
  state,
  pageSize = 10,
}: IssuesLoaderProps): JSX.Element | null => {
  const variables = useMemo(
    () => ({
      owner,
      name,
      state: [state],
      pageSize,
    }),
    [owner, name, state, pageSize]
  );

  const { loading, error, data, fetchMore } = useQuery<{
    repository: { issues: CommentsProps };
  }>(ISSUES_QUERY, {
    variables,
  });

  const cursor = data?.repository?.issues?.pageInfo?.endCursor;

  const onLoadMore = useCallback(() => {
    fetchMore({
      query: ISSUES_QUERY,
      variables: {
        ...variables,
        cursor: cursor,
      },
      /* should be moved to typedef */
      updateQuery: (prev, { fetchMoreResult: next }) => {
        if (!next) return prev;
        return {
          repository: {
            ...prev.repository,
            issues: {
              ...prev.repository.issues,
              // update pagination info
              pageInfo: next.repository.issues.pageInfo,
              // append new issues
              edges: [
                ...prev.repository.issues.edges,
                ...next.repository.issues.edges,
              ],
            },
          },
        };
      },
    });
  }, [fetchMore, variables, cursor]);

  if (error) return <MessageError />;

  if (!data || !Children) return null;

  return (
    <Children
      loading={loading}
      error={error}
      issues={data?.repository?.issues}
      onLoadMore={onLoadMore}
      hasNextPage={data?.repository?.issues?.pageInfo.hasNextPage}
    />
  );
};
