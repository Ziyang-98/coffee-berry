import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      // margin: theme.spacing(2),
      // marginLeft: theme.spacing(30),
      width: "40ch",
    },

    textField: {
      width: "25ch",
    },
  },
  form: {
    margin: theme.spacing(25, 0),
    paddingBottom: theme.spacing(15),
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

// function submit(name) {
//   console.log(name);
// }

export default function Dashboard() {
  const classes = useStyles();

  const history = useHistory();

  const handleClick = (name) => {
    setName("");
    history.push(`/orders/${name}`);
  };

  const [name, setName] = React.useState("");

  return (
    <div className={classes.form}>
      <Typography
        component="h4"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Enter your name to track your orders
      </Typography>
      <div className={classes.searchBar}>
        <FormControl
          className={clsx(classes.input, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="add-search">Search</InputLabel>
          <OutlinedInput
            id="add-search"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={() => {
                    handleClick(name);
                  }}
                  edge="end"
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={50}
          />
        </FormControl>
      </div>
    </div>
  );
}
