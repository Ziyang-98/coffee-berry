import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FilterIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export default function Filter({ filter }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [beanType, setBeanType] = React.useState("");
  const [roastLevel, setRoastLevel] = React.useState("");
  const [isOrganic, setIsOrganic] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    filter(beanType, roastLevel, isOrganic);
    setBeanType("");
    setRoastLevel("");
    setIsOrganic("");
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<FilterIcon />}
        onClick={handleClickOpen}
      >
        Filter
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select the following</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="bean-type-select-label">
                Coffee Bean Type
              </InputLabel>
              <Select
                native
                labelId="bean-type-select-label"
                id="bean-type-select-label"
                value={beanType}
                onChange={(e) => {
                  setBeanType(e.target.value);
                }}
                input={<Input />}
              >
                <option aria-label="None" value="" />
                <option value={"arabica"}>Arabica</option>
                <option value={"robusta"}>Robusta</option>
                <option value={"liberica"}>Liberica</option>
                <option value={"excelsa"}>Excelsa</option>
                <option value={"others"}>Others</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="roast-level-select-label">Roast level</InputLabel>
              <Select
                native
                labelId="roast-level-select-label"
                id="roast-level-select-label"
                value={roastLevel}
                onChange={(e) => {
                  setRoastLevel(e.target.value);
                }}
                input={<Input />}
              >
                <option aria-label="None" value="" />
                <option value={"light"}>Light</option>
                <option value={"medium"}>Medium</option>
                <option value={"dark"}>Dark</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="is-organic-select-label">Organic?</InputLabel>
              <Select
                native
                labelId="is-organic-select-label"
                id="is-organic-select-label"
                value={isOrganic}
                onChange={(e) => {
                  setIsOrganic(e.target.value);
                }}
                input={<Input />}
              >
                <option aria-label="None" value="" />
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
