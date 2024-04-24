import React from "react";
import { inject, observer } from "mobx-react";

import Table from "common/component/table";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Model from "common/component/model";
import Notification from "common/component/notification";
import AddFeedback from "./addFeedback";

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
    title: "ReviewedBy",
    dataIndex: "reviewedBy",
    key: "reviewedBy",
  },
];

function Review({ reviews }: any) {
  const [openFeedbackModal, setOpenFeedbackModal] = React.useState(false);
  const [currentMember, setCurrentMember] = React.useState({});
  const [notification, setNotification] = React.useState({
    open: false,
    severity: "",
    message: "",
  });


  React.useEffect(() => {
    reviews.getAllReview();
  }, [reviews]);

  const handleOpenFeedbackModal = (member: any) => {
    setCurrentMember(member);
    setOpenFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };

  const extraRows = (member: any) => (
    <TableCell>
      <Button
        variant="contained"
        onClick={() => handleOpenFeedbackModal(member)}
        color="primary"
      >
        {member?.feedback ? "edit" : "add"}
      </Button>
    </TableCell>
  );

  const extraColumns = () => (
    <>
      <TableCell>Feedback</TableCell>
    </>
  );

  return (
    <Box m={pxToRem(20)}>
      <Typography variant='h4'>Review</Typography>
      <br />
      <br />
      <Table
        rows={reviews.normalizedReview}
        columns={columns}
        extraRows={extraRows}
        extraColumns={extraColumns}
      />
      <Model
        title="Assign Member For Review"
        open={openFeedbackModal}
        handleClose={handleCloseFeedbackModal}
        fullWidth
      >
        <AddFeedback
          currentMember={currentMember}
          handlers={{
            editFeedback: reviews.editFeedback,
            getAllReview: reviews.getAllReview,
            handleClose: handleCloseFeedbackModal,
            callback: setNotification
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

export default inject("reviews")(observer(Review));
