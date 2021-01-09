import React from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: theme.spacing(80),
  },
  successPage: {
    backgroundColor: theme.palette.background.paper,

    paddingTop: theme.spacing(25),
    height: theme.spacing(40),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    paddingTop: theme.spacing(5),
  },
}));

export default function Deleted() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Container Container className={classes.successPage} maxWidth="md">
          <Typography variant="h5" align="center">
            You have deleted the posting and all the orders on the product.
          </Typography>
        </Container>
      </div>
    </React.Fragment>
  );
}
