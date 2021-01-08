import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import OrderDialog from "./OrderDialog";

const useStyles = (theme) => ({
  actions: {
    margin: theme.spacing(5, 0, 0, 0),
    //bottom: 0,
  },
  button: {
    margin: theme.spacing(10, 0, 0, 0),
    bottom: 0,
  },
});

class OrderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    console.log("open button");
    const open = true;
    this.setState({ open });
  }

  handleClose() {
    const open = false;
    this.setState({ open });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.actions}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={this.handleOpen}
        >
          Order Now
        </Button>
        <OrderDialog
          posting={this.props.posting}
          open={this.state.open}
          handleClose={this.handleClose.bind(this)}
          postOrder={this.props.postOrder}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(OrderButton);
