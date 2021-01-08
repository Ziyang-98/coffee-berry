import React from "react";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

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

export default function Success() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Container Container className={classes.successPage} maxWidth="md">
          <Typography variant="h5" align="center">
            You have successfully made a posting! You can go to the "Market" to
            find your posting, or go to "Your Postings" to manage the posting.
          </Typography>
        </Container>
        <div className={classes.buttons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link className="to-market" href="/market">
                <Button variant="outlined" color="primary">
                  Move to Market
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link className="to-your-postings" href="/postings">
                <Button variant="outlined" color="primary">
                  Move to Your Postings
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}
