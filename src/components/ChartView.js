import React, { useState, useEffect } from "react";
import axios from "axios";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { makeStyles, Grid } from "@material-ui/core";

import PriceView from "./PriceView";
ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

const addZero = (num) => {
  return num <= 9 ? `0${num}` : num;
};

const Timezone = () => {
  let getTime = new Date();
  let currentHour = getTime.getHours();
  let currentTime =
    addZero(currentHour) +
    ":" +
    getTime.getMinutes() +
    ":" +
    getTime.getSeconds();
  return currentTime;
};

const useStyles = makeStyles({
  root: {
    padding: "2px",
    height: "60vh",
    width: "100vw",
  },
  priceStyle: {
    padding: "10px",
  },
});
const ChartView = () => {
  const classes = useStyles();
  let chartRef = null;
  const [usd, setUsd] = useState("");
  const [difBtc, setDifBtc] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [initVal, setInitialVal] = useState(0);
  const [start, setStart] = useState(false);
  const [dataSource, setDataSource] = useState({
    chart: {
      caption: "Trading View",
      xAxisName: "Time and Current Value",
      yAxisName: "BTC/USD Value",
      yAxisPosition: "right",
      refreshinterval: "0.5",
      slantLabels: "1",
      numdisplaysets: "50",
      labelDisplay: "Auto",
      showValues: "0",
      numberPrefix: "$",
      theme: "candy",
    },
    catgories: [
      {
        category: [
          {
            label: Timezone().toString(),
          },
        ],
      },
    ],
    dataset: [
      {
        data: [
          {
            value: 0,
          },
        ],
      },
    ],
  });

  let chartConfig = {
    id: "TradingView",
    type: "realtimeline",
    renderAt: "container",
    width: "100%",
    height: "100%",
    dataFormat: "json",
  };

  const getData = async () => {
    const response = await axios.get(
      "https://api.cryptonator.com/api/ticker/btc-usd"
    );
    const value = response.data;
    const sourceData = dataSource;
    sourceData.chart.yAxisMaxValue = parseInt(value.ticker.price) + 20;
    sourceData.chart.yAxisMinValue = parseInt(value.ticker.price) - 20;
    setShowChart(true);
    setDataSource(sourceData);
    setInitialVal(value.ticker.price);
    setStart(true);
  };

  const upgradeData = () => {
    setInterval(async () => {
      const response = await axios.get(
        "https://api.cryptonator.com/api/ticker/btc-usd"
      );
      const value = response.data;
      console.log(value);
      setUsd(value.ticker.price);
      setDifBtc(value.ticker.change);
      let xAxis = Timezone();
      let yAxis = value.ticker.price;
      chartRef = FusionCharts("TradingView");
      chartRef.feedData(`&label= ${xAxis} &value= ${yAxis}`);
    }, 1000);
  };
  if (start) {
    upgradeData();
    setStart(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Grid container direction="row" className={classes.root}>
        <Grid item xs={12} md={12} className={classes.priceStyle}>
          <PriceView
            header="Bitcoin / U.S. Dollar"
            price={usd}
            change={difBtc}
            value={initVal}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.chartStyle}>
          {showChart ? (
            <ReactFC
              {...chartConfig}
              dataSource={dataSource}
              onRender={chartRef}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartView;
