import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#B4CAD5",
    width: 275,
  },
  title: {
    fontSize: 14,
  },
});

const PriceView = (props) => {
  const classes = useStyles();

  const price =
    typeof Number(props.price) === "number" && !isNaN(Number(props.price))
      ? Number(props.price).toFixed(2)
      : props.price;
  const change =
    typeof Number(props.change) === "number" && !isNaN(Number(props.change))
      ? Number(props.change).toFixed(2)
      : props.change;
  return (
    <Card elivation={5} className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.header}
        </Typography>
        <Typography>{props.label}</Typography>

        <Typography variant="h4">
          {price}
          <span style={{ fontSize: "15px" }}> USD</span>
        </Typography>
        <Typography variant="h6" style={{ color: "red" }}>
          -{change}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PriceView;
