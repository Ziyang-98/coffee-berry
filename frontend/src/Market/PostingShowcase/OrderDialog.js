import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  unitsForm: {
    margin: theme.spacing(2, 0),
  },
  sliderHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    width: theme.spacing(30),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function OrderDialog({ posting, open, handleClose, postOrder }) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [units, setUnits] = React.useState(0);

  const handleSliderChange = (event, newValue) => {
    setUnits(newValue);
  };

  const handleSubmit = () => {
    if (name === "") {
      handleNoName();
    }

    if (address === "") {
      handleNoAddress();
    }

    if (units === 0) {
      handleNoUnits();
    }

    if (!(name === "" || address === "" || units === 0)) {
      console.log("All details are present");
      postOrder(posting, name, address, units);
      setName("");
      setAddress("");
      setUnits(0);
      handleClose();
    }
  };
  /*----Alert Conditions----*/
  const [noName, setNoName] = React.useState(false);
  const [noAddress, setNoAddress] = React.useState(false);
  const [noUnits, setNoUnits] = React.useState(false);

  /*----Handle Alerts----*/
  const handleNoName = () => {
    setNoName(true);
  };

  const handleNoAddress = () => {
    setNoAddress(true);
  };

  const handleNoUnits = () => {
    setNoUnits(true);
  };

  const handleAlertClose = () => {
    setNoName(false);
    setNoAddress(false);
    setNoUnits(false);
  };

  const getDisplayLabel = () => {
    if (noName || noAddress || noUnits) {
      return noName && noAddress && noUnits
        ? "Please enter your name, address and the number of units cannot be 0."
        : noName && noAddress
        ? "Please enter your name and address."
        : noName && noUnits
        ? "Please enter your name and the number of units cannot be 0."
        : noName
        ? "Please enter your name."
        : noAddress && noUnits
        ? "Please enter your address and the number of units cannot be 0."
        : noAddress
        ? "Please enter your address"
        : "The number of units cannot be 0";
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Order Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name, address, the link of your product image and
            number of units that you would like to order.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="*Name"
            type="name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="*Address"
            type="address"
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className={classes.unitsForm}>
            <Typography color="textSecondary">*Units (In KG)</Typography>
            <div className={classes.sliderHolder}>
              <Slider
                className={classes.slider}
                defaultValue={0}
                value={typeof units === "number" ? units : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                min={0}
                max={posting.units}
                valueLabelDisplay="auto"
              />
            </div>
          </div>
          <div>
            <Typography variant="h5">
              Total: ${units * posting.pricePerUnit}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={noName || noAddress || noUnits}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="error"
        >
          {getDisplayLabel()}
        </Alert>
      </Snackbar>
    </div>
  );
}
