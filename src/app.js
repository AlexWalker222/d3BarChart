// @ts-nocheck
import * as d3 from "d3";

const BOTTOM_PADDING = 50,
  LEFT_PADDING = 25,
  RIGHT_PADDING = 10,
  TOP_PADDING = 10,
  HEIGHT = 600,
  WIDTH = 400;

const usableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING,
  usableWidth = WIDTH - LEFT_PADDING - RIGHT_PADDING;

const allData = [
  { name: "apple", colorIndex: 1 },
  { name: "banana", colorIndex: 2 },
  { name: "cherry", colorIndex: 3 },
  { name: "date", colorIndex: 4 },
  { name: "grape", colorIndex: 5 },
  { name: "mango", colorIndex: 6 },
  { name: "peach", colorIndex: 7 },
  { name: "raspberry", colorIndex: 8 },
  { name: "strawberry", colorIndex: 9 },
  { name: "tangerine", colorIndex: 10 },
  { name: "watermelon", colorIndex: 11 },
];
let yAxisGroup, xAxisGroup, xScale, yScale, barWidth, barPadding;

const colorScale = d3.scaleOrdinal(d3.schemePaired); // 12 colors

const random = (max) => Math.floor(Math.random() * max + 1);

function getRandomData() {
  const count = random(allData.length);
  const shuffled = allData.sort(() => 0.5 - Math.random());
  const data = shuffled.slice(0, count);
  data.sort((f1, f2) => {
    return f1.name.localeCompare(f2.name);
  });
  for (const item of data) {
    item.score = random(10);
  }
  return data;
}

function updateRect(rect) {
  rect
    .attr("fill", (d) => colorScale(d.colorIndex))
    .attr("width", barWidth - barPadding * 2)
    .attr("height", (d) => usableHeight - yScale(d.score))
    .attr("x", barPadding)
    .attr("y", (d) => TOP_PADDING + yScale(d.score));
}

function updateYAxis(svg, max) {
  if (!yAxisGroup) {
    yAxisGroup = svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${LEFT_PADDING}, ${TOP_PADDING})`);
  }

  const tickValues = Array.from(Array(max + 1).keys());

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(tickValues)
    .tickFormat((n) => n.toFixed(0));

  yAxis(yAxisGroup);
}

function getTextColor(bgColor) {
  const red = parseInt(bgColor.substring(1, 3), 16);
  const green = parseInt(bgColor.substring(3, 5), 16);
  const blue = parseInt(bgColor.substring(5, 7), 16);

  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance > 0.5 ? "black" : "white";
}

function updateText(text) {
  text
    .attr("fill", (d) => {
      let barColor = colorScale(d.colorIndex);
      return getTextColor(barColor);
    })
    .text((d) => d.score)
    .attr("x", barWidth / 2) // center horizontally in bar
    .attr("y", (d) => TOP_PADDING + yScale(d.score) + 20); // just below top
}

function updateXAxis(svg, data) {
  if (!xAxisGroup) {
    xAxisGroup = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${TOP_PADDING + usableHeight})`);
  }

  const xAxisScale = d3
    .scaleBand()
    .domain(data.map((item) => item.name)) // fruit names
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  const xAxis = d3.axisBottom(xAxisScale).ticks(data.length);
  xAxis(xAxisGroup);
}

function updateData() {
  const data = getRandomData();
  barPadding = Math.ceil(30 / data.length);
  barWidth = usableWidth / data.length;
  xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);
  const max = d3.max(data, (d) => d.score);
  yScale = d3.scaleLinear().domain([0, max]).range([usableHeight, 0]);

  const svg = d3.select("#chart").attr("width", WIDTH).attr("height", HEIGHT);
  const groups = svg
    .selectAll(".bar")
    .data(data, (d) => d.name)
    .join((enter) => {
      const groups = enter.append("g").attr("class", "bar");
      groups
        .append("rect")
        .attr("height", 0)
        .attr("y", TOP_PADDING + usableHeight);
      groups.append("text").attr("y", TOP_PADDING + usableHeight);

      return groups;
    });

  groups.attr("transform", (__, i) => "translate(" + xScale(i) + ", 0)");

  updateRect(groups.select("rect"));

  updateText(groups.select("text"));

  updateYAxis(svg, data, max);

  updateXAxis(svg, data);
}

updateData();
