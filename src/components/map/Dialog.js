import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import React from "react";

export default class MessageDialog extends React.PureComponent {
  state = {
    text: ""
  };

  render() {
    const { dialogOpen, handleClose, submitMessage } = this.props;

    return (
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Write you secret</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can leave your mark on history. Please enter your secret
            message here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="text"
            fullWidth
            onChange={e => this.setState({ text: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => submitMessage(this.state.text)}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
