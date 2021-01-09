import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  actions: {
    margin: theme.spacing(5, 0, 0, 0),
    //bottom: 0,
  },
  button: {
    margin: theme.spacing(18, 0, 0, 35),
    right: 0,
    bottom: 0,
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

async function deletePosting(postingId) {
  await axios.post(
    `http://localhost:9000/postings/deletePosting/${postingId}`,
    {
      postingId: postingId,
    }
  );
  console.log("deleted");
}

export default function DeleteDialog({ name, postingId, orders }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const [ordersNotDone, setOrdersNotDone] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (orders.some((order) => order.status !== "delivered")) {
      setOpen(false);
      setOrdersNotDone(true);
      return;
    }
    await deletePosting(postingId);
    setOpen(false);
    history.push(`/postings/${name}/${postingId}/deleted`);
  };

  const handleAlertClose = () => {
    setOrdersNotDone(false);
  };

  return (
    <div className={classes.actions}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting the posting would delete all the orders on this product.
            Please make sure that all the orders are settled first before
            deleting the product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={ordersNotDone}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="error"
        >
          You still have orders that are not delivered yet! Please deliver your
          remaing orders before deleting the posting.
        </Alert>
      </Snackbar>
    </div>
  );
}
