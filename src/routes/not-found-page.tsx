import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { LayoutContent as Content } from '../components';

const useStyle = makeStyles({
  content: {
    paddingTop: 120,
    textAlign: 'center',
  },
});

const NotFound = () => {
  const classes = useStyle();
  return (
    <Content className={classes.content}>
      <Typography variant="h3">404 Not found</Typography>
    </Content>
  );
};

export default NotFound;
