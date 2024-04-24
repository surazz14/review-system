import React from "react";
import { inject, observer } from "mobx-react";

import Table from "common/component/table";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Model from "common/component/model";
import AddMember from "modulus/admin/addMember";
import AssignMember from "modulus/admin/assignMember";
import Loading from "common/component/loading";
import Notification from "common/component/notification";

import { pxToRem } from "theme";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
];

function Member({ members }: any) {
  const [openAddMemberModal, setOpenAddMemberModal] = React.useState(false);
  const [openEditMemberModal, setOpenEditMemberModal] = React.useState(false);
  const [currentMember, setCurrentMember] = React.useState({});
  const [notification, setNotification] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  React.useEffect(() => {
    members.getAllMember();
  }, [members]);

  const [openAssignMemberModal, setOpenAssignMemberModal] =
    React.useState(false);

  const handleOpenAddMemberModal = () => {
    setOpenAddMemberModal(true);
  };

  const handleCloseAddMemberModal = () => {
    setOpenAddMemberModal(false);
  };

  const handleOpenAssignMemberModal = (_id: any) => {
    setCurrentMember(_id);
    setOpenAssignMemberModal(true);
  };

  const handleCloseAssignMemberModal = () => {
    setOpenAssignMemberModal(false);
  };

  const handleOpenEditMemberModal = (member: any) => {
    setCurrentMember(member);
    setOpenEditMemberModal(true);
  };

  const handleCloseEditMemberModal = () => {
    setOpenEditMemberModal(false);
  };

  const extraRows = (member: any) => (
    <>
      <TableCell>
        <Button
          variant="contained"
          onClick={() => handleOpenAssignMemberModal(member)}
          color="primary"
        >
          Assign
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          onClick={() => handleOpenEditMemberModal(member)}
          color="primary"
        >
          Edit
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            try {
              const response: any = await members.deleteMember(member?._id);
              setNotification({
                message: response?.message,
                severity: "success",
                open: true,
              });
            } catch (e) {
              setNotification({
                message: e?.data?.error?.message,
                severity: "success",
                open: true,
              });
              console.info(e);
            }
          }}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );

  const extraColumns = () => (
    <>
      <TableCell>Review</TableCell>
      <TableCell>Action</TableCell>
    </>
  );

  if (members.members.length < 0) {
    return <Loading loading={true} />;
  }

  return (
    <Box m={pxToRem(20)}>
      <Typography variant="h4">Member</Typography>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddMemberModal}
      >
        Add Member
      </Button>
      <br />
      <br />
      <Table
        rows={members.membersExceptMe}
        columns={columns}
        extraRows={extraRows}
        extraColumns={extraColumns}
      />
      <Model
        title="Add Member"
        open={openAddMemberModal}
        handleClose={handleCloseAddMemberModal}
        fullWidth
      >
        <AddMember
          handlers={{
            addMember: members.addMember,
            callback: setNotification,
            handleClose: handleCloseAddMemberModal,
          }}
        />
      </Model>
      <Model
        title="Assign Member For Review"
        open={openAssignMemberModal}
        handleClose={handleCloseAssignMemberModal}
        fullWidth
      >
        <AssignMember
          members={members}
          currentMember={currentMember}
          handlers={{
            assignMember: members.assignMember,
            handleClose: handleCloseAssignMemberModal,
          }}
        />
      </Model>
      <Model
        title="Assign Member For Review"
        open={openEditMemberModal}
        handleClose={handleCloseEditMemberModal}
        fullWidth
      >
        <AddMember
          mode="edit"
          currentMember={currentMember}
          handlers={{
            editMember: members.editMember,
            callback: setNotification,
            handleClose: handleCloseEditMemberModal,
          }}
        />
      </Model>
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

export default inject("members")(observer(Member));
