import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import { Info } from '../../svg/Info';
import { ISSUE_STATE } from '../../utils';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 18,
    width: 18,
    color: '#01D48A',
    '&.closed': {
      color: theme.palette.error.main,
    },
  },
}));

interface IssueStateIconProps {
  state?: ISSUE_STATE.OPEN | ISSUE_STATE.CLOSED;
  className?: string;
}

export const IssueStateIcon = memo<IssueStateIconProps>(
  ({ className, state }) => {
    const classes = useStyles();
    const closed = state === ISSUE_STATE.CLOSED;
    return <Info className={cx(classes.icon, className, { closed })} />;
  }
);
