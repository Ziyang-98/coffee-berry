import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import OrderButton from "./OrderButton";

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

const useStyles = (theme) => ({
  root: {
    display: "flex",
    height: theme.spacing(65),
    margin: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: theme.spacing(60),
    height: theme.spacing(40),
    marginBottom: theme.spacing(5),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  imageHolder: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  detailsHolder: {
    margin: theme.spacing(7, 0, 5, 0),
  },
  price: {
    margin: theme.spacing(2, 0),
    fontWeight: 600,
    color: "#6F4E37",
  },
  units: {
    margin: theme.spacing(2, 2),
    fontWeight: 600,
    color: "#6F4E37",
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  actions: {
    margin: theme.spacing(5, 0, 0, 0),
    //bottom: 0,
  },
  button: {
    margin: theme.spacing(10, 0, 0, 0),
    bottom: 0,
  },
});

class Posting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postingId: props.match.params.postingId,
      posting: basePostings.find((posting) =>
        String(posting.postingId).match(props.match.params.postingId)
      ),
    };
  }

  postOrder(posting, name, address, units) {
    console.log(posting, name, address, units);
  }

  render() {
    const posting = this.state.posting;
    const { classes } = this.props;
    let tagString = "";
    if (posting.tags.beanType) {
      tagString = tagString.concat(posting.tags.beanType + ", ");
    }

    if (posting.tags.roastLevel) {
      tagString = tagString.concat(posting.tags.roastLevel + ", ");
    }

    if (posting.tags.organic) {
      tagString = tagString.concat("organic");
    }

    if (tagString.endsWith(", ")) {
      tagString = tagString.slice(0, -2);
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" className={classes.container}>
          <Card className={classes.root}>
            <div className={classes.imageHolder}>
              <img
                className={classes.image}
                style={{ display: posting.image }}
                src={posting.image}
                alt=""
              />
            </div>
            <CardContent className={classes.content}>
              <div className={classes.detailsHolder}>
                <Typography component="h3" variant="h4">
                  {posting.nameOfProduct}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Posted by {posting.username}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Tags: {tagString}
                </Typography>
                <Divider />
                <div>
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.price}
                  >
                    ${posting.pricePerUnit} Per Kg
                  </Typography>
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.units}
                  >
                    {posting.units}kg left
                  </Typography>
                </div>
                <div className={classes.description}>
                  <Typography variant="subtitle1">
                    {posting.description}
                  </Typography>
                </div>
              </div>
              <OrderButton
                posting={posting}
                postOrder={this.postOrder.bind(this)}
              />
            </CardContent>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Posting);
