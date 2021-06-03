import React, { memo, useCallback, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { InputSearch } from '../input';
import { Info as GithubIcon } from '../../svg/Info';

const useStyles = makeStyles((theme) => {
  const appBarBackground = theme.palette.background.default;

  return {
    appContainer: {
      background: '#f6f6f6',
    },
    appBar: {
      background: appBarBackground,
    },
    header: {
      background: appBarBackground,
      color: theme.palette.getContrastText(appBarBackground),
    },
    centered: {
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto',
    },
    toolbar: {
      position: 'relative',
      minHeight: 60,
    },
    toolbarContent: {
      display: 'flex',
      alignItems: 'center',
    },
    main: {
      padding: '24px 16px 24px',
    },
    logo: {
      height: 32,
      width: 'auto',
      position: 'absolute',
      top: '50%',
      left: 16,
      transform: 'translateY(-50%)',
      color: theme.palette.text.primary,
    },
    searchInput: {
      transition: theme.transitions.create('width'),
      width: 110,
      '&:focus': {
        width: 180,
      },
    },
    grow: {
      flex: 1,
    },
  };
});

type LayoutProps = RouteComponentProps;

const LayoutContainer = memo<LayoutProps>(({ children, history }) => {
  const [state, setstate] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputRef?.current?.value;
    history.push(`/search?q=${q}`);
  };

  const onChange = useCallback(
    ({
      target: { value },
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      function validate(value: string) {
        var regex = /^[0-9a-zA-Z ]*$/;
        if (!regex.test(value)) {
          return false;
        }
        return true;
      }
      if (validate(value)) setstate(value);
    },
    [setstate]
  );

  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={cx(classes.toolbarContent, classes.centered)}>
            <Link to="/">
              <GithubIcon className={classes.logo} />
            </Link>
            <div className={classes?.grow} />
            <form onSubmit={onSubmitSearch}>
              <InputSearch
                value={state}
                onChange={onChange}
                fullWidth={false}
                placeholder="Search for repo"
                inputProps={{
                  ref: inputRef,
                  className: classes.searchInput,
                }}
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
});

export const Layout = withRouter(LayoutContainer);
