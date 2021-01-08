import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FilterButton from "./Filter";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router-dom";
import axios from "axios";

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
    width: theme.spacing(35),
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

// const basePostings = [
//   {
//     postingId: 1,
//     username: "James",
//     nameOfProduct: "Fresh Arabica Coffee Beans",
//     units: 100,
//     pricePerUnit: 35,
//     image: "https://source.unsplash.com/G88j9KT5u4g/1600x900",
//     tags: {
//       beanType: "arabica",
//       roastLevel: "light",
//       organic: false,
//     },
//     description: "Fresh Arabica Coffee Beans from Brazil.",
//     pending: [],
//     confirmed: [],
//     delivered: [],
//   },
//   {
//     postingId: 2,
//     username: "Oliver",
//     nameOfProduct: "Robusta Beans",
//     units: 120,
//     pricePerUnit: 20,
//     image: "https://source.unsplash.com/PMnJWQ1F_ww/1600x900",
//     tags: {
//       beanType: "robusta",
//       roastLevel: "dark",
//       organic: true,
//     },
//     description: "These beans were freshly harvested in India. 100% Organic",
//     pending: [],
//     confirmed: [],
//     delivered: [],
//   },
//   {
//     postingId: 3,
//     username: "James",
//     nameOfProduct: "Kopi Nganu",
//     units: 50,
//     pricePerUnit: 50,
//     image: "https://source.unsplash.com/tvVkydhyspU/1600x900",
//     tags: {
//       beanType: "others",
//       roastLevel: "",
//       organic: true,
//     },
//     description: "Fresh from Indonesia. While stocks last.",
//     pending: [],
//     confirmed: [],
//     delivered: [],
//   },
// ];

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
      basePostings: [],
      postings: [],
    };
    this.filter = this.filter.bind(this);
    this.reset = this.reset.bind(this);
  }

  async componentDidMount() {
    const basePostings = await axios.get(
      `http://localhost:9000/postings/allPostings`
    );
    this.setState({
      basePostings: Object.values(basePostings.data),
      postings: Object.values(basePostings.data),
    });
  }

  filter(beanType, roastLevel, isOrganic) {
    let filteredPostings = [...this.state.basePostings];
    const tagsToFilter = [];
    if (beanType) {
      tagsToFilter.push(beanType);
    }

    if (roastLevel) {
      tagsToFilter.push(roastLevel);
    }

    if (isOrganic) {
      tagsToFilter.push(isOrganic);
    }

    // console.log(tagsToFilter, "Before filter");
    for (let tag of tagsToFilter) {
      filteredPostings = filteredPostings.filter((posting) => {
        return Object.values(posting.tags).includes(tag);
      });
    }
    console.log(tagsToFilter, "After filter");

    this.setState({
      postings: filteredPostings,
    });
  }

  reset() {
    this.setState({ postings: this.state.basePostings });
  }

  submit(value) {
    let filteredPostings = [...this.state.basePostings];
    filteredPostings = filteredPostings.filter((posting) => {
      return posting.nameOfProduct.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ searchValue: "", postings: filteredPostings });
  }

  setSearchValue = (e) => {
    this.setState({ searchValue: e });
  };

  render() {
    const { classes } = this.props;
    const { history } = this.props;

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
                Coffee Bean Haven
              </Typography>
              <div className={classes.heroButtons}>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <FormControl
                      className={clsx(classes.root, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="add-search">Search</InputLabel>
                      <OutlinedInput
                        id="add-search"
                        value={this.state.searchValue}
                        onChange={(e) => {
                          this.setSearchValue(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="search"
                              onClick={() => {
                                this.submit(this.state.searchValue);
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
                  </Grid>
                  <Grid item>
                    <FilterButton filter={this.filter} />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      onClick={this.reset}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.postings.map((posting) => (
                <Grid item key={posting.postingId} xs={12} sm={6} md={4}>
                  <ButtonBase
                    className={classes.buttonBase}
                    onClick={(event) => {
                      history.push(`/market/${posting.postingId}`);
                    }}
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

export default withStyles(useStyles)(withRouter(Market));
