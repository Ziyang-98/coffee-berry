import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import LocalCafeTwoToneIcon from "@material-ui/icons/LocalCafeTwoTone";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    // backgroundcolor: "#4d0000",
  },
  toolbarTitle: {
    flex: 1,
    alignItems: "center",
  },
  toolbarSecondary: {
    justifyContent: "center",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(0, 8),
    fontSize: 15,
    flexShrink: 0,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 6),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 3),
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
          <LocalCafeTwoToneIcon />
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
