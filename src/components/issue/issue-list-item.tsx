import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { TimeAgo } from './time-ago';
import { IssueStateIcon } from './issue-state-icon';

import { memo } from 'react';
import { IssueStateProps } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.loading': {
      // remove mouse interactions when loading
      pointerEvents: 'none',
    },
  },
  commentIcon: {
    height: 18,
    width: 18,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing() / 2,
  },
  listItemIcon: {
    marginRight: 0,
  },
}));

interface IssueListItemProps extends Partial<Omit<IssueStateProps, 'author'>> {
  title?: string;
  number?: number;
  commentCount?: number;
  loading?: boolean;
  author?: string;
}

export const IssueListItem = memo<IssueListItemProps>(
  ({
    title,
    number,
    createdAt = '',
    state,
    author = 'unknown',
    commentCount,
    loading,
    ...other
  }) => {
    const classes = useStyles();
    return (
      <ListItem className={cx(classes.root, { loading })} button {...other}>
        <ListItemIcon className={classes.listItemIcon}>
          <IssueStateIcon state={state} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle1" noWrap>
              {title}
            </Typography>
          }
          secondary={
            <Typography variant="caption" noWrap color="textSecondary">
              #{number} opened <TimeAgo date={createdAt} /> by {author}
            </Typography>
          }
        />
        {(loading || !!commentCount) && (
          <ListItemIcon className={classes.listItemIcon}>
            <>
              <CommentIcon className={classes.commentIcon} />
              <Typography variant="caption">{commentCount}</Typography>
            </>
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
);
