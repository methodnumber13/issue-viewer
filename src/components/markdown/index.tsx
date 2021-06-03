import { memo } from 'react';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Code } from './code';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    '& p': {
      wordWrap: 'break-word',
    },
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
}));

export const Markdown = memo<ReactMarkdownOptions>(
  ({ className, ...props }) => {
    const classes = useStyles();
    return (
      <ReactMarkdown
        components={{ code: Code, p: ({ children }) => <p>{children}</p> }}
        className={cx(classes.root, className)}
        {...props}
      />
    );
  }
);
