import { memo, ReactNode } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface MessageProps {
  className?: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: `${theme.spacing() * 4}px 0`,
  },
  content: {
    margin: '0 auto',
    maxWidth: 300,
  },
  iconContainer: {
    marginBottom: theme.spacing(),
  },
}));

export const Message = memo<MessageProps>(
  ({ className, title, description, icon, ...props }) => {
    const classes = useStyles();
    return (
      <div className={cx(classes.root, className)} {...props}>
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.content}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>
      </div>
    );
  }
);
