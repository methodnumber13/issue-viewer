import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarBorder from '@material-ui/icons/Star';
import cx from 'classnames';
import {
  ListItemText,
  ListItemIcon,
  ListItemProps,
  Typography,
  ListItem,
} from '@material-ui/core';
import { formatStarCount } from '../../utils';

interface RepoListItemProps extends ListItemProps {
  description?: string;
  starCount?: number;
  loading?: boolean;
}

const useStyles = makeStyles({
  root: {
    '&.loading': {
      pointerEvents: 'none',
    },
  },
  title: {
    fontWeight: 500,
  },
  starIcon: {
    height: 18,
    width: 18,
    marginRight: 4,
  },
  starCount: {
    lineHeight: '18px',
  },
  listItemIcon: {
    marginRight: 0,
  },
});

export const RepoListItem = memo<RepoListItemProps>(
  ({ className, title, description, starCount, loading }) => {
    const classes = useStyles();
    return (
      <ListItem className={cx(classes.root, className, { loading })} button>
        <ListItemText
          disableTypography
          primary={
            <Typography
              className={classes.title}
              color="primary"
              variant="subtitle1"
              noWrap
            >
              {title}
            </Typography>
          }
          secondary={
            <Typography color="textSecondary">{description}</Typography>
          }
        />
        <ListItemIcon className={classes.listItemIcon}>
          <>
            <StarBorder color="action" className={classes.starIcon} />
            <Typography color="textSecondary" className={classes.starCount}>
              {formatStarCount(starCount)}
            </Typography>
          </>
        </ListItemIcon>
      </ListItem>
    );
  }
);
