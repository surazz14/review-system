import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { pxToRem } from "theme";

interface AddMemberType {
  currentMember: any;
  handlers: {
    editFeedback: (id: string, feedback: string, currentMember: any) => void;
    getAllReview: () => void;
    callback?: any;
    handleClose: () => void;
  };
}

export default function AddFeedback({
  currentMember,
  handlers,
}: AddMemberType) {
  const [feedback, setFeedback] = React.useState("");

  React.useEffect(() => {
    if (currentMember.feedback) {
      setFeedback(currentMember.feedback);
    }
  }, [currentMember]);

  const onChange = (e: any) => {
    setFeedback(e.target.value);
  };


  const onAdd = async () => {
    try {
      let response: any =
        handlers?.editFeedback &&
        (await handlers.editFeedback(
          currentMember._id,
          feedback,
          currentMember
        ));
      handlers.getAllReview();

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

  return (
    <Box>
      <Box m={pxToRem(8)}>
        <TextField
          id="feedback"
          label="Feedback"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={onChange}
        />
      </Box>
      <Box m={pxToRem(8)}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Add Feedback
        </Button>
      </Box>
    </Box>
  );
}
