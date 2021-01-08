import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  tagTitle: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function submitPosting(
  name,
  pricePerUnit,
  unit,
  tags,
  nameOfProduct,
  description,
  image
) {
  console.log(
    name,
    pricePerUnit,
    unit,
    tags,
    nameOfProduct,
    description,
    image
  );
}

export default function Checkout() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [nameOfProduct, setNameOfProduct] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [pricePerUnit, setPricePerUnit] = React.useState("");
  const [units, setUnits] = React.useState("");
  const [image, setImage] = React.useState("");
  const [beanType, setBeanType] = React.useState("");
  const [roastedLevel, setRoastedLevel] = React.useState("");
  const [organic, setOrganic] = React.useState("");

  // Alert states
  const [noName, setNoName] = React.useState(false);
  const [noNameOfProduct, setNoNameOfProduct] = React.useState(false);
  const [noDescription, setNoDescription] = React.useState(false);
  const [noPricePerUnit, setNoPricePerUnit] = React.useState(false);
  const [noUnits, setNoUnits] = React.useState(false);

  const handleSubmit = () => {
    let error = false;
    if (name === "") {
      setNoName(true);
      error = true;
    }

    if (nameOfProduct === "") {
      setNoNameOfProduct(true);
      error = true;
    }

    if (description === "") {
      setNoDescription(true);
      error = true;
    }

    if (pricePerUnit === "" || isNaN(pricePerUnit)) {
      setNoPricePerUnit(true);
      error = true;
    }

    if (units === "" || isNaN(units)) {
      setNoUnits(true);
      error = true;
    }

    if (error) {
      return;
    }

    const isOrganic = organic.match("yes");
    submitPosting(
      name,
      pricePerUnit,
      units,
      {
        beanType: beanType,
        roastedLevel: roastedLevel,
        organic: isOrganic,
      },
      nameOfProduct,
      description,
      image
    );
    history.push("/create_posting/successful-upload");
  };

  const handleAlertClose = () => {
    setNoName(false);
    setNoNameOfProduct(false);
    setNoDescription(false);
    setNoPricePerUnit(false);
    setNoUnits(false);
  };

  const getDisplayLabel = () => {
    if (
      (noName || noNameOfProduct || noDescription) &&
      (noPricePerUnit || noUnits)
    ) {
      return "Please enter the missing details or correct an invalid price/unit number";
    } else if (noName || noNameOfProduct || noDescription) {
      return "Please enter the missing details";
    } else if (noPricePerUnit || noUnits) {
      return "Please correct an invalid price/unit number";
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}
          >
            Create a posting
          </Typography>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Important notes:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              1) Remember your name so that you can manage your posting in "Your
              Postings" page
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              2) If your image link is invalid, your posting will not show the
              image. Do check if it is valid by entering it in any web browser
              (if the image appears its valid)
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="given-name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="nameOfProduct"
                  name="nameOfProduct"
                  label="Name of the product"
                  fullWidth
                  autoComplete="name-of-product"
                  onChange={(e) => setNameOfProduct(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description of the product"
                  multiline
                  rows={2}
                  rowsMax={5}
                  fullWidth
                  autoComplete="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="pricePerUnit"
                  name="pricePerUnit"
                  label="Price per KG"
                  fullWidth
                  autoComplete="price-per-unit"
                  onChange={(e) => setPricePerUnit(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="units"
                  name="units"
                  label="Total no. of units you selling"
                  fullWidth
                  autoComplete="units"
                  onChange={(e) => setUnits(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="imageLink"
                  name="imageLink"
                  label="Link of image"
                  fullWidth
                  autoComplete="image-link"
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>
              <Typography variant="subtitle1" className={classes.tagTitle}>
                Select the tags below so that your potential customer can find
                your posting better:
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Coffee Bean Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={beanType}
                      onChange={(e) => {
                        setBeanType(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"arabica"}>Arabica</MenuItem>
                      <MenuItem value={"robusta"}>Robusta</MenuItem>
                      <MenuItem value={"liberica"}>Liberica</MenuItem>
                      <MenuItem value={"excelsa"}>Excelsa</MenuItem>
                      <MenuItem value={"others"}>Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Roasted Level
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={roastedLevel}
                      onChange={(e) => {
                        setRoastedLevel(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"light"}>Light</MenuItem>
                      <MenuItem value={"medium"}>Medium</MenuItem>
                      <MenuItem value={"dark"}>Dark</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Organic?
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={organic}
                      onChange={(e) => {
                        setOrganic(e.target.value);
                      }}
                    >
                      <MenuItem value={"yes"}>Yes</MenuItem>
                      <MenuItem value={"no"}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.button}
              >
                Create Posting
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
      <Snackbar
        open={
          noName ||
          noNameOfProduct ||
          noDescription ||
          noPricePerUnit ||
          noUnits
        }
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          className={classes.alert}
          onClose={handleAlertClose}
          severity="error"
        >
          {getDisplayLabel()}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
