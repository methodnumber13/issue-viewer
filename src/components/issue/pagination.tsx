import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Toolbar } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
}));

interface PaginationProps {
  disabled?: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export const Pagination = memo<PaginationProps>(
  ({ onLoadMore, hasNextPage }) => {
    const classes = useStyle();
    return (
      <Toolbar className={classes.root}>
        <Button disabled={!hasNextPage} onClick={onLoadMore} color="primary">
          Load more
        </Button>
      </Toolbar>
    );
  }
);
