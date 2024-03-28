import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Button, Typography } from "@mui/material";
import useStyles from "./style";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import Submenu from "./Submenu";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
      align="center"
    >
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
      </div>
        {user ? (
          <Submenu user={user} setUser={setUser} />
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary" style={{borderRadius: '12px'}}>
            Sign In
          </Button>
        )}
    </AppBar>
  );
};

export default NavBar;
