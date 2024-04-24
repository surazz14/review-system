import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { roleType } from "entities/user/user";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "red",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export interface SideMenuType {
  logout: () => void;
  role: string;
}

function SideMenu({ logout, role }: SideMenuType) {
  const classes = useStyles();
  const onLogout = () => {
    logout();
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5">Admin panel</Typography>
        </Box>

        <List>
          <Link style={{ textDecoration: "none" }} to="/member">
            {role === roleType.admin && (
              <ListItem button key={"member"}>
                <ListItemText primary="Member" />
              </ListItem>
            )}

            <Divider />
          </Link>
          <Link style={{ textDecoration: "none" }} to="/review">
            <ListItem button key={"review"}>
              <ListItemText primary="Review" />
            </ListItem>
          </Link>
        </List>
        <Box textAlign="center">
          <Button onClick={onLogout}>Logout</Button>
        </Box>
      </Drawer>
    </div>
  );
}

export default SideMenu;
