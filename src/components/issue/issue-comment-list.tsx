import { memo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { nanoid } from 'nanoid';

import { IssueComment } from './issue-comment';
import { IssueDTO } from '../types';

export const COMMENTS_QUERY = gql`
  query IssueCommentList($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        comments(first: 30) {
          edges {
            node {
              id
              author {
                login
                avatarUrl
              }
              body
              createdAt
            }
          }
        }
      }
    }
  }
`;

interface IssueCommentListProps {
  owner: string;
  name: string;
  number: number;
  placeholderCount: number;
}

export const IssueCommentList = memo<IssueCommentListProps>(
  ({ owner, name, number, placeholderCount }): JSX.Element | null => {
    const { loading, error, data } = useQuery<
      IssueDTO,
      Pick<IssueCommentListProps, 'owner' | 'name' | 'number'>
    >(COMMENTS_QUERY, {
      variables: { owner, name, number },
    });
    if (error) {
      return <>{'Error'}</>;
    }

    if (loading) {
      return (
        <>
          {Array.from({ length: placeholderCount }, (v, i) => i).map(() => (
            <IssueComment key={nanoid()} />
          ))}
        </>
      );
    }
    if (!data) return null;

    return (
      <>
        {data?.repository?.issue?.comments?.edges?.map(({ node: comment }) => {
          const { id, body, createdAt, author } = comment;
          return (
            <IssueComment
              key={id}
              body={body}
              createdAt={createdAt}
              author={author}
            />
          );
        })}
      </>
    );
  }
);
