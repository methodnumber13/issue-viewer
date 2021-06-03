import { memo } from 'react';
import cx from 'classnames';
import { Typography, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import OpenIcon from '@material-ui/icons/OpenInNew';

import { TimeAgo } from './time-ago';
import { Chip as IssueStateChip } from './issue-state-chip';
import { ISSUE_STATE } from '../../utils';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingRight: 36,
  },
  headline: {
    marginBottom: theme.spacing() * 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  meta: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  issueNumber: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing() / 2,
  },
  statusChip: {
    marginRight: theme.spacing(),
  },
  openButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 32,
    width: 32,
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

interface IssueHeaderProps {
  className?: string;
  title?: string;
  number?: number;
  createdAt?: string;
  author?: string;
  state?: ISSUE_STATE.OPEN | ISSUE_STATE.CLOSED;
  commentsCount?: number;
  url?: string;
}

export const IssueHeader = memo<IssueHeaderProps>(
  ({
    className,
    title,
    author,
    commentsCount,
    number,
    createdAt,
    state,
    url,
  }) => {
    const classes = useStyle();
    const timeAgo = createdAt && <TimeAgo date={createdAt} />;
    const issueNumber = number && (
      <span className={classes.issueNumber}>#{number}</span>
    );
    const issueState = state && (
      <IssueStateChip className={classes.statusChip} state={state} />
    );
    const meta = (
      <span className={classes.meta}>
        <strong>{author}</strong> opened this issue {timeAgo} ·
      </span>
    );

    return (
      <div className={cx(classes.root, className)}>
        <Typography className={classes.headline} variant="h5">
          <>
            {title} {issueNumber}
          </>
        </Typography>

        <Typography
          variant="body1"
          color="textSecondary"
          component="span"
          className={classes.subtitle}
        >
          {issueState}
          <>
            {meta} {commentsCount} comments
          </>
        </Typography>

        {url && (
          <Tooltip title="Open in github">
            <IconButton className={classes.openButton} href={url}>
              <OpenIcon color="action" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
);
