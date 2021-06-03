import { memo, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: 16,
  },
}));

interface LayoutContentProps {
  className?: string;
  children: ReactNode;
}

export const LayoutContent = memo<LayoutContentProps>(
  ({ className, children }) => {
    const classes = useStyles();
    return <div className={cx(classes.root, className)}>{children}</div>;
  }
);
