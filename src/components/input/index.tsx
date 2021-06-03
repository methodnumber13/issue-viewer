import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

import InputBase from './input-base';
import { Theme, InputProps } from '@material-ui/core';
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  searchButton: {
    height: 30,
    width: 30,
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

export const InputSearch = memo<InputProps>(({ disabled, ...restProps }) => {
  const classes = useStyles();
  return (
    <InputBase
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            disabled={disabled}
            tabIndex={-1}
            className={classes.searchButton}
            type="submit"
          >
            <Search />
          </IconButton>
        </InputAdornment>
      }
      {...restProps}
    />
  );
});
