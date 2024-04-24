import React from "react";
import { Route, Switch, Router as BrowserRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Box from "@material-ui/core/Box";

import Sidebar from "modulus/sidebar";
import routes from "./";
import apphistory from "apphistory";

function RouterSwitch({ token }) {
  if (token) {
    apphistory.push("/review");
  }
  return (
    <Switch>
      {routes.map(({ ...rest }, index) => {
        if (token) {
          if (rest.is_private) {
            return <Route key={index} {...rest} />;
          }
        } else {
          if (!rest.is_private) {
            return <Route key={index} {...rest} />;
          }
        }
        return null;
      })}
    </Switch>
  );
}

const Router = ({ user }) => {
  const { token, logout, role } = user;
  return (
    <BrowserRouter history={apphistory}>
      {token && (
        <Box>
          <Sidebar logout={logout} role={role} />
        </Box>
      )}

      <Box ml={token ? "200px" : 0}>
        <RouterSwitch token={token} />
      </Box>
    </BrowserRouter>
  );
};

export default inject("user")(observer(Router));
