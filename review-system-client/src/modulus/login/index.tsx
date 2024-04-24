import React from "react";
import { inject, observer } from "mobx-react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Notification from "common/component/notification";
import { pxToRem } from "theme";

const useStyles = makeStyles({
  root: {
    minWidth: 575,
  },
});

function Login({ user }: any) {
  const classes = useStyles();

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const [notification, setNotification] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  const onChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onLogin = async () => {
    try {
      await user.login(loginData);
    } catch (e) {
      setNotification({
        open: true,
        severity: "error",
        message: e?.data?.error?.message,
      });
    }
  };

  // const receiveMessage = (event: any) => {
  //   console.log("this is event", event);
  //   // alert("got message: " + event.data);
  // };
  function getData() {
    setTimeout(() => {
      const myIframe = document.getElementById("test");
      console.log("myIframe", myIframe);
      // @ts-ignore

      const message = {
        apiKey:"1234",
        onPreview:'()=>{}',
        onSave:'()=>{}',
      };
      // @ts-ignore
      myIframe.contentWindow.postMessage(
        JSON.stringify(message),
        "*"
      );
    }, 1000);
  }

  return (
    <Box display="flex" justifyContent="center" mt={pxToRem(240)}>
      <Card className={classes.root} variant="outlined">
        <Box m={pxToRem(12)} textAlign="center">
          <Typography variant="h4" color="primary">
            Login
          </Typography>
        </Box>
        <Box m={pxToRem(12)}>
          <TextField
            label="Email"
            name="email"
            value={loginData.email}
            onChange={onChange}
            type="text"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box m={pxToRem(12)}>
          <TextField
            label="Password"
            name="password"
            value={loginData.password}
            onChange={onChange}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box m={pxToRem(12)}>
          <Button variant="contained" onClick={onLogin} color="primary">
            Login
          </Button>
        </Box>
      </Card>
      <iframe
        width="853"
        onLoad={getData}
        id="test"
        height="480"
        src="http://localhost:3000"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Notification
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        severity={notification.severity}
      >
        {notification?.message}
      </Notification>
    </Box>
  );
}
export default inject("user")(observer(Login));
