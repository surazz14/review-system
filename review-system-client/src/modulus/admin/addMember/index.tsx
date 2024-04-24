import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { pxToRem } from "theme";

interface AddMemberType {
  currentMember?: any;
  mode?: string;
  handlers: {
    addMember?: (member: any) => void;
    editMember?: (member: any, _id: string) => void;
    callback?: any;
    handleClose: () => void;
  };
}

export default function AddMember({
  currentMember,
  mode = "add",
  handlers,
}: AddMemberType) {
  const [member, setMember] = React.useState({
    name: "",
    email: "",
    address: "",
    position: "",
    password: "",
  });

  React.useEffect(() => {
    if (mode === "edit") {
      setMember({ ...currentMember });
    }
  }, [currentMember, mode]);

  const onAdd = async () => {
    try {
      let response: any;
      if (mode === "add") {
        response = handlers?.addMember && (await handlers.addMember(member));
      } else {
        response =
          handlers?.editMember &&
          (await handlers.editMember(member, currentMember._id));
      }
      handlers.callback({
        open: true,
        message: response?.message,
        severity: "success",
      });
    } catch (e) {
      handlers.callback({
        open: true,
        message: e?.data?.error?.message,
        severity: "error",
      });
    }
    handlers.handleClose();
  };

  const onChange = (e: any) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Box m={pxToRem(8)}>
        <TextField
          label="Name"
          name="name"
          value={member.name}
          onChange={onChange}
          type="text"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={pxToRem(8)}>
        <TextField
          label="Email"
          name="email"
          value={member.email}
          onChange={onChange}
          type="text"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={pxToRem(8)}>
        <TextField
          label="Address"
          name="address"
          value={member.address}
          onChange={onChange}
          type="text"
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box m={pxToRem(8)}>
        <TextField
          label="Position"
          name="position"
          value={member.position}
          onChange={onChange}
          type="text"
          variant="outlined"
          fullWidth
        />
      </Box>

      <Box m={pxToRem(8)}>
        <TextField
          label="password"
          name="password"
          value={member.password}
          onChange={onChange}
          type="password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={pxToRem(8)}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          {mode} Member
        </Button>
      </Box>
    </Box>
  );
}
