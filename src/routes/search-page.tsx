import { makeStyles } from '@material-ui/core/styles';
import { ApolloError, useQuery, gql } from '@apollo/client';
import { Link, RouteComponentProps } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import {
  LayoutContent as Content,
  RepoListItem,
  Message,
  MessageError,
} from '../components';

import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  title: {
    ...theme.mixins.gutters(),
  },
}));

const SEARCH_REPO = gql`
  query SearchRepo($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            nameWithOwner
            owner {
              login
            }
            description
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const DEFAULT_QUERY = 'stars:>1000';

interface SearchChildrenProps {
  loading: boolean;
  data: any;
  error: ApolloError | undefined;
  q: string;
}

const SearchChildren = ({ loading, data, error, q }: SearchChildrenProps) => {
  if (loading) {
    // Loading state
    return (
      <List>
        <RepoListItem loading />
        <RepoListItem loading />
        <RepoListItem loading />
        <RepoListItem loading />
      </List>
    );
  } else if (error) {
    // Error state
    return <MessageError />;
  } else if (!data.search.edges.length) {
    // Empty state
    return (
      <Message
        title="Oops"
        description={`We couldn't find results for "${q}"`}
      />
    );
  }

  return (
    <List>
      {data.search.edges.map(({ node: repo }: any) => {
        return (
          <Link key={repo.id} to={`/${repo.owner.login}/${repo.name}`}>
            <RepoListItem
              title={repo.nameWithOwner}
              description={repo.description}
              starCount={repo.stargazers.totalCount}
            />
          </Link>
        );
      })}
    </List>
  );
};

const Search = memo<RouteComponentProps>(({ location }) => {
  const classes = useStyles();
  const q = location.search.split('?q=')[1];

  const { loading, error, data } = useQuery(SEARCH_REPO, {
    variables: { query: q || DEFAULT_QUERY },
  });
  return (
    <>
      <Content className={classes.content}>
        <Typography className={classes.title} variant="h6" gutterBottom>
          Search Repositories
        </Typography>
        <SearchChildren
          loading={loading}
          data={data}
          error={error}
          q={q as string}
        />
      </Content>
    </>
  );
});

export default Search;
