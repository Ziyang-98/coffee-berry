import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 4),
  },
  heroButtons: {
    marginTop: theme.spacing(0),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  buttonBase: {
    height: "100%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  price: {
    margin: theme.spacing(0, 1),
    fontWeight: 600,
    color: "#6F4E37",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const basePostings = [
  {
    postingId: 1,
    username: "James",
    nameOfProduct: "Fresh Arabica Coffee Beans",
    units: 100,
    pricePerUnit: 35,
    image: "https://source.unsplash.com/G88j9KT5u4g/1600x900",
    tags: {
      beanType: "arabica",
      roastLevel: "light",
      organic: false,
    },
    description: "Fresh Arabica Coffee Beans from Brazil.",
    pending: [],
    confirmed: [],
    delivered: [],
  },
  {
    postingId: 2,
    username: "Oliver",
    nameOfProduct: "Robusta Beans",
    units: 120,
    pricePerUnit: 20,
    image: "https://source.unsplash.com/PMnJWQ1F_ww/1600x900",
    tags: {
      beanType: "robusta",
      roastLevel: "dark",
      organic: true,
    },
    description: "These beans were freshly harvested in India. 100% Organic",
    pending: [],
    confirmed: [],
    delivered: [],
  },
  {
    postingId: 3,
    username: "James",
    nameOfProduct: "Kopi Nganu",
    units: 50,
    pricePerUnit: 50,
    image: "https://source.unsplash.com/tvVkydhyspU/1600x900",
    tags: {
      beanType: "others",
      roastLevel: "",
      organic: true,
    },
    description: "Fresh from Indonesia. While stocks last.",
    pending: [],
    confirmed: [],
    delivered: [],
  },
];

class Postings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.match.params.name,
      postings: [],
    };
  }

  componentDidMount() {
    let userPostings = basePostings;
    const inputName = this.state.name.toLowerCase();
    userPostings = userPostings.filter((posting) =>
      posting.username.toLowerCase().match(inputName)
    );
    this.setState({ postings: userPostings });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Hi {this.state.name}, here are your postings.
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.postings.map((posting) => (
                <Grid item key={posting.postingId} xs={12} sm={6} md={4}>
                  <ButtonBase
                    className={classes.buttonBase}
                    onClick={(event) => {}}
                  >
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={posting.image}
                        title={posting.nameOfProduct}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {posting.nameOfProduct}
                        </Typography>
                        <Typography>{posting.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Typography
                          variant="subtitle1"
                          component="h2"
                          //align="right"
                          className={classes.price}
                        >
                          ${posting.pricePerUnit} per kg
                        </Typography>
                      </CardActions>
                    </Card>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Postings);
