import { memo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import queryString from 'querystring';

import {
  IssueList,
  LayoutHeader as Header,
  LayoutContent as Content,
  IssueListFilter,
  RepoHeader,
} from '../components';
import { RouteComponentProps } from 'react-router-dom';
import { ISSUE_STATE } from '../utils';

const REPO_INFO_QUERY = gql`
  query Repo($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      owner {
        login
      }
      description
    }
  }
`;

interface RepoDTO {
  name: string;
  owner: { login: string };
  description: string;
}

const useStyle = makeStyles((theme) => ({
  content: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  filters: {
    marginBottom: theme.spacing() * 2,
    paddingLeft: theme.spacing() * 2,
  },
}));

const RepoPage = memo<RouteComponentProps>(({ history, location, match }) => {
  const [value, setValue] = useState(ISSUE_STATE.OPEN);
  const classes = useStyle();

  const handleChangeState = useCallback(
    (e, value) => {
      setValue(value);
      history.replace({ search: `?state=${value}` });
    },
    [history, setValue]
  );

  const { owner, name } = match.params as { owner: string; name: string };
  const { state = ISSUE_STATE.OPEN || undefined } = queryString.parse(
    location.search
  );

  const { data } = useQuery<{ repository: RepoDTO }>(REPO_INFO_QUERY, {
    variables: { owner, name },
  });

  if (!data) return null;

  return (
    <>
      <Header>
        <RepoHeader repository={data?.repository} />
      </Header>
      <Content className={classes.content}>
        <IssueListFilter
          value={value}
          className={classes.filters}
          state={state as string}
          onChange={handleChangeState}
          name={name}
          owner={owner}
        />
        <IssueList owner={owner} name={name} state={value} />
      </Content>
    </>
  );
});

export default RepoPage;
