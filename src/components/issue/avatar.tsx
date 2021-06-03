import { memo } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar as MuiAvatar, AvatarProps } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 2,
    height: 46,
    width: 46,
  },
}));

const Avatar = memo<AvatarProps>(({ className, src, ...props }) => {
  const classes = useStyles();
  return (
    <MuiAvatar className={cx(classes.root, className)} src={src} {...props} />
  );
});

export default Avatar;
