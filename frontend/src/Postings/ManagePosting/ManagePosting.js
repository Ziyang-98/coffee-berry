import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import DeleteDialog from "./DeleteDialog";
import OrderList from "./OrderList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import axios from "axios";

const useStyles = (theme) => ({
  root: {
    display: "flex",
    height: theme.spacing(50),
    margin: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: theme.spacing(50),
    height: theme.spacing(30),
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
    width: "50%",
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
    //margin: theme.spacing(2, 2),
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
    margin: theme.spacing(18, 0, 0, 35),
    right: 0,
    bottom: 0,
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
});

function getAllOrders(posting) {
  let orders = [];
  for (var i = posting.pending.length - 1; i >= 0; i--) {
    orders.push(posting.pending[i]);
  }

  for (var j = posting.confirmed.length - 1; j >= 0; j--) {
    orders.push(posting.confirmed[j]);
  }

  for (var k = posting.delivered.length - 1; k >= 0; k--) {
    orders.push(posting.delivered[k]);
  }

  return orders;
}

// Generate Order Data
function createData(id, date, productName, amount, status) {
  return { id, date, productName, amount, status };
}

class ManagePosting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postingId: props.match.params.postingId,
      posting: {},
      orders: [],
      rows: [],
      tagString: "",
    };
  }

  async componentDidMount() {
    let posting = await axios.get(
      `http://localhost:9000/postings/postingWithId/${this.state.postingId}`
    );
    posting = posting.data;
    console.log(posting);
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

    const orders = getAllOrders(posting);
    console.log(orders);
    // const rows = orders;
    // .map((order) =>
    //   createData(
    //     order.orderId,
    //     order.date,
    //     order.productName,
    //     order.amount,
    //     order.status
    //   )
    // );

    this.setState({
      posting: posting,
      orders: orders,
      rows: orders,
      tagString: tagString,
    });
    this.refresh = this.refresh.bind(this);
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
  }

  async refresh() {
    let posting = await axios.get(
      `http://localhost:9000/postings/postingWithId/${this.state.postingId}`
    );
    posting = posting.data;
    // console.log(posting, "after refresh");
    const orders = getAllOrders(posting);
    // console.log(orders, "after refresh");
    this.setState({
      posting: posting,
      orders: orders,
    });
  }

  render() {
    const posting = this.state.posting;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Card className={classes.root}>
            <div className={classes.imageHolder}>
              <img
                className={classes.image}
                style={{ display: posting.image }}
                src={posting.image}
                alt=""
                onLoad={this.handleImageLoaded.bind(this)}
              />
            </div>
            <CardContent className={classes.content}>
              <div className={classes.detailsHolder}>
                <Typography variant="h6" className={classes.detail}>
                  Product Name: {posting.nameOfProduct}
                </Typography>
                <Divider />
                <div>
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.units}
                  >
                    No. of units left: {posting.units}kg
                  </Typography>
                </div>
              </div>
              <DeleteDialog
                name={this.props.match.params.name}
                postingId={this.state.postingId}
                orders={this.state.orders}
              />
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <OrderList
                  rows={this.state.rows}
                  refresh={this.refresh.bind(this)}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}></Box>
        </Container>{" "}
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(ManagePosting);
