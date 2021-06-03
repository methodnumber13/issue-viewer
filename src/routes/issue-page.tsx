import { useQuery, gql } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';

import {
  LayoutHeader as Header,
  LayoutContent as Content,
  IssueHeader,
  IssueComment,
  MessageError,
  IssueCommentList,
} from '../components';

import { memo } from 'react';
import { IssueStateProps } from '../components/types';

const useStyles = makeStyles({
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
  },
  issueHeader: {
    marginTop: 24,
  },
});

export const ISSUE_QUERY = gql`
  query IssueQuery($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        author {
          login
          avatarUrl
        }
        createdAt
        comments {
          totalCount
        }
        state
        body
        url
      }
    }
  }
`;

interface IssueProps extends Omit<RouteComponentProps, 'match'> {
  match: { params: { owner: string; name: string; number: number } };
}

const Issue = memo<IssueProps>(({ match }): JSX.Element | null => {
  const classes = useStyles();

  const { owner, name } = match.params;
  const issueNumber = Number(match.params.number);

  const { loading, error, data } = useQuery<{
    repository: { issue: IssueStateProps };
  }>(ISSUE_QUERY, {
    variables: { owner, name, number: issueNumber },
  });
  if (error) return <MessageError />;
  if (!data) return null;

  const { issue } = data?.repository || ({} as { issue: IssueStateProps });
  const { author, comments, title, number, createdAt, state, url } = issue;

  return (
    <>
      <Header>
        <div className={classes.breadcrumb}>
          <Link to={`/${owner}/${name}`}>
            <Typography variant="h6">
              {owner} / {name}{' '}
            </Typography>
          </Link>
        </div>
        {!loading && (
          <IssueHeader
            className={classes.issueHeader}
            title={title}
            number={number}
            createdAt={createdAt}
            state={state}
            author={author?.login}
            commentsCount={comments.totalCount}
            url={url}
          />
        )}
      </Header>
      {!loading && (
        <Content>
          <IssueComment
            author={issue.author}
            body={issue.body}
            createdAt={issue.createdAt}
          />

          <IssueCommentList
            owner={owner}
            name={name}
            number={issueNumber}
            placeholderCount={Math.min(comments.totalCount, 3)}
          />
        </Content>
      )}
    </>
  );
});

export default Issue;
