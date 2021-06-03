import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Chip as ChipBase, ChipProps } from '@material-ui/core';

import { Info } from '../../svg/Info';
import { memo } from 'react';
import { ISSUE_STATE } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#01D48A',
    color: '#fff',
    fontWeight: 500,
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: theme.spacing(),
    color: theme.palette.common.white,
  },
}));

export const Chip = memo<ChipProps & { state: ISSUE_STATE }>(
  ({ className }) => {
    const classes = useStyles();
    return (
      <ChipBase
        className={cx(classes.root, className)}
        icon={<Info color="inherit" className={classes.icon} />}
        label="Open"
      />
    );
  }
);
