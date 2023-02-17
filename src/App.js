import "./App.css";
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

function App() {
  useEffect(() => {
    createGraph();
  }, []);
  const createGraph = async () => {
    let data = [
      { time: "12AM", temp: 45 },
      { time: "1AM", temp: 20 },
      { time: "2AM", temp: 34 },
      { time: "3AM", temp: 12 },
      { time: "4AM", temp: 27 },
      { time: "5AM", temp: 17 },
      { time: "6AM", temp: 10 },
      { time: "7AM", temp: 20 },
      { time: "8AM", temp: 28 },
      { time: "9AM", temp: 30 },
      { time: "10AM", temp: 8 },
      { time: "11AM", temp: 47 },
      { time: "12PM", temp: 18 },
      { time: "1PM", temp: 5 },
      { time: "2PM", temp: 28 },
      { time: "3PM", temp: 20 },
      { time: "4PM", temp: 10 },
      { time: "5PM", temp: 17 },
      { time: "6PM", temp: 27 },
      { time: "7PM", temp: 12 },
      { time: "8PM", temp: 34 },
      { time: "9PM", temp: 20 },
      { time: "10PM", temp: 45 },
      { time: "11PM", temp: 39 },
    ];
    //data = formattedTempTimeData;
    console.log(data);
    // set the dimensions and margins of the graph
    let margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    let svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},     ${margin.top})`);

    // Add X axis and Y axis
    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    x.domain(
      data.map((d) => {
        return d.time;
      })
    );
    let y = d3.scaleLinear().range([height, 0]);
    y.domain([
      0,
      d3.max(data, (d) => {
        return d.temp;
      }),
    ]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // add the Line
    let valueLine = d3
      .line()
      .x((d) => {
        return x(d.time);
      })
      .y((d) => {
        return y(d.temp);
      });
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  };
  return (
    <div className="App">
      <h1>Today's Temperature in Plano, Tx Area</h1>
      <h3>
        Line Graph: Y-axis: Temp(<span>&deg;C</span>). X-axis: Time
      </h3>
    </div>
  );
}

export default App;
