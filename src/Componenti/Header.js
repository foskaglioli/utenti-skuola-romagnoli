import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './icons/logo_skuola.PNG';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ textAlign: 'right', background: '#007dc3'}} >
        <Toolbar>
          <img src={logo} alt="Logo" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
