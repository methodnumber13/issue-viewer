import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LayoutContent as Content } from '../layout/layout-content';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.getContrastText(theme.palette.background.default),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing() * 2,
    },
  },
  content: {
    padding: `${theme.spacing() * 3}px`,
    paddingTop: theme.spacing() * 4,
  },
}));

export const LayoutHeader = memo(({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Content className={classes.content}>{children}</Content>
    </div>
  );
});
