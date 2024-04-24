import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { pxToRem } from "theme";

interface AddMemberType {
  members: any;
  currentMember: any;
  handlers: {
    assignMember: (currentMember: any, selectedMember: any) => void;
    handleClose: () => void;
  };
}

export default function AssignMember({
  members,
  currentMember,
  handlers,
}: AddMemberType) {
  const [selectedMembers, setSelectedMembers] = React.useState([]);

  React.useEffect(() => {
    if (currentMember?.assigned) {
      setSelectedMembers(
        members.normalizedAssignedUser(currentMember?.assigned)
      );
    }
  }, [currentMember, currentMember.assigned, members]);

  const onAssign = () => {
    handlers.assignMember(currentMember, selectedMembers);
    handlers.handleClose();
  };

  const onChange = (e: any, value: any) => {
    setSelectedMembers(value);
  };

  return (
    <Box>
      <Box m={pxToRem(8)}>
        <Autocomplete
          multiple
          options={members.membersExcept(
            currentMember._id,
            members.membersExceptMe
          )}
          value={selectedMembers}
          onChange={onChange}
          getOptionLabel={(option: any) => option?.email}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Member"
              placeholder="Select members"
            />
          )}
        />
      </Box>
      <Box m={pxToRem(8)}>
        <Button variant="contained" color="primary" onClick={onAssign}>
          Assign Member
        </Button>
      </Box>
    </Box>
  );
}
