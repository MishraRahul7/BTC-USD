import React from "react";
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "Center",
  },
  title: {
    flexGrow: 1,
  },
}));

const TitleBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#011126",
        }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trading View
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default TitleBar;
