import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  subtitle: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  root: {
    marginBottom: theme.spacing() * 3,
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
}));

interface RepoHeaderProps {
  repository: {
    owner: {
      login: string;
    };
    name: string;
    description: string;
  };
}

export const RepoHeader = memo<RepoHeaderProps>(({ repository }) => {
  const classes = useStyle();

  if (!repository) return null;

  const { name = '', owner, description = '' } = repository;
  return (
    <div className={classes.root}>
      <Typography variant="h6">
        {owner?.login} / {name}
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.subtitle}
        color="textSecondary"
      >
        {description}
      </Typography>
    </div>
  );
});
