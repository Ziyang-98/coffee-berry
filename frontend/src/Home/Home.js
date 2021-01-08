import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import MainFeaturedPost from "./MainFeaturedPost";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    height: "80%",
  },
}));

const mainFeaturedPost = {
  title: "The new experience for coffee beans",
  description: "There is never too much coffee",
  image: "https://source.unsplash.com/collection/1499506/1600x900",
  imgText: "main image description",
};

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
    </React.Fragment>
  );
}
