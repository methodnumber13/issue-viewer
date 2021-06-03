import { memo } from 'react';
import cx from 'classnames';
import { Input, InputProps, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing() / 2,
    borderRadius: theme.shape.borderRadius,
  },
}));

type InputBaseProps = InputProps;

const InputBase = memo<InputBaseProps>(
  ({ className, value, onChange, placeholder, ...props }) => {
    const classes = useStyles();
    return (
      <Input
        className={cx(classes?.root, className)}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disableUnderline
        fullWidth
        {...props}
      />
    );
  }
);

export default InputBase;
