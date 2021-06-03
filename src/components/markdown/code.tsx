import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cx from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    fontFamily: "'Roboto Mono', monospace;",
    padding: '1px 2px',
    fontSize: 13,
    borderRadius: theme.shape.borderRadius,
  },
}));

interface CodeProps {
  inline?: boolean;
  className?: string;
}

export const Code = memo<CodeProps>(
  ({ children, className, inline, ...rest }) => {
    const classes = useStyles();

    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={dark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...rest}
      />
    ) : (
      <code className={cx(classes.root, className)} {...rest} />
    );
  }
);
