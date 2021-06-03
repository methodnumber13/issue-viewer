import { Tab, Tabs } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import { memo } from 'react';
import { TabsPropsExtended } from '../types';

export const ISSUES_COUNT_QUERY = gql`
  query IssuesCount($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      openedCount: issues(states: [OPEN]) {
        totalCount
      }
      closedCount: issues(states: [CLOSED]) {
        totalCount
      }
    }
  }
`;

export const IssueListFilter = memo<
  TabsPropsExtended & { state: string; owner: string }
>(({ classes, state, onChange, name, owner, value, ...otherProps }) => {
  const { data } = useQuery(ISSUES_COUNT_QUERY, {
    variables: { name, owner },
  });

  if (!data) return null;
  const { openedCount = {}, closedCount = {} } = data?.repository;

  return (
    <Tabs
      value={value}
      onChange={onChange}
      indicatorColor="primary"
      {...otherProps}
    >
      <Tab
        value="OPEN"
        label={
          openedCount?.totalCount ? `${openedCount.totalCount} OPEN` : 'OPEN'
        }
      />
      <Tab
        value="CLOSED"
        label={
          closedCount?.totalCount
            ? `${closedCount?.totalCount} CLOSED`
            : 'CLOSED'
        }
      />
    </Tabs>
  );
});
