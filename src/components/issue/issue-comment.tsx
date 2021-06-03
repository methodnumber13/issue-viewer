import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Markdown } from '../markdown';
import { TimeAgo } from './time-ago';
import Avatar from './avatar';
import { memo } from 'react';
import { IssueStateProps } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing() * 3,
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    padding: theme.spacing() * 2,
    paddingTop: theme.spacing(),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing() * 2,
  },
  avatar: {
    marginRight: theme.spacing() * 2,
  },
  author: {
    marginRight: theme.spacing() / 2,
  },
}));

export const IssueComment = memo<Partial<IssueStateProps>>(
  ({ body, author, createdAt }): JSX.Element => {
    const classes = useStyles();
    const { avatarUrl, login } = author || {};

    return (
      <div data-testid={createdAt} className={classes.root}>
        <div className={classes.header}>
          <Avatar className={classes.avatar} src={avatarUrl} />
          <div>
            <Typography variant="subtitle2" className={classes.author}>
              {login}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              commented <TimeAgo date={createdAt} />
            </Typography>
          </div>
        </div>

        <Markdown
          className={classes.content}
          children={body || '*No description provided*'}
        />
      </div>
    );
  }
);
