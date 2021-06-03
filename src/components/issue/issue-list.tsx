import { memo } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';

import { IssueListItem } from './issue-list-item';
import { IssuesLoader } from './issue-loader';
import { Pagination } from './pagination';
import { Message } from '../message/message';
import { ISSUE_STATE } from '../../utils';

const Loading = () => (
  <List>
    <IssueListItem loading />
    <IssueListItem loading />
    <IssueListItem loading />
    <IssueListItem loading />
  </List>
);

const EmptyState = () => (
  <Message
    title="There is no issues here"
    description="Looks like not everybody has issues after all."
  />
);

interface IssueListProps {
  owner: string;
  name: string;
  state?: ISSUE_STATE;
}

export const IssueList = memo<IssueListProps>(({ state, name, owner }) => {
  return (
    <IssuesLoader owner={owner} name={name} state={state as ISSUE_STATE}>
      {({ loading, issues, hasNextPage, onLoadMore }) => {
        if (loading) return <Loading />;
        else if (!issues.edges.length) {
          return <EmptyState />;
        }
        return (
          <div>
            <List>
              {issues.edges.map(({ node: issue }) => {
                const {
                  id,
                  number,
                  title,
                  author,
                  comments,
                  state,
                  createdAt,
                } = issue;
                return (
                  <Link key={id} to={`/${owner}/${name}/issues/${number}`}>
                    <IssueListItem
                      number={number}
                      title={title}
                      author={author?.login}
                      createdAt={createdAt}
                      commentCount={comments.totalCount}
                      state={state}
                    />
                  </Link>
                );
              })}
            </List>
            <Pagination onLoadMore={onLoadMore} hasNextPage={hasNextPage} />
          </div>
        );
      }}
    </IssuesLoader>
  );
});
