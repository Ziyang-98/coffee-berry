import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 100,
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function OrderRow({ row, refresh }) {
  const [status, setStatus] = React.useState(row.status);
  const [updated, setUpdated] = React.useState(false);

  const handleUpdate = async () => {
    console.log(row.orderId);
    await axios.post(
      `http://localhost:9000/orders/updateOrder/${row.orderId}`,
      {
        orderId: row.orderId,
        name: row.name,
        postingId: row.postingId,
        productName: row.productName,
        address: row.amount,
        amount: row.amount,
        status: status,
        date: row.date,
      }
    );
    setUpdated(true);
    refresh();
  };

  const handleAlertClose = () => {
    setUpdated(false);
  };

  const classes = useStyles();
  return (
    <TableRow key={row.id}>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.productName}</TableCell>
      <TableCell>{row.amount}</TableCell>
      <TableCell>
        <FormControl className={classes.formControl}>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"confirmed"}>Confirmed</MenuItem>
            <MenuItem value={"delivered"}>Delivered</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </TableCell>
      <Snackbar
        open={updated}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="success"
        >
          Order status is updated successfully.
        </Alert>
      </Snackbar>
    </TableRow>
  );
}
