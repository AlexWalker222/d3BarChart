// @ts-nocheck
import { scaleOrdinal, schemePaired, axisLeft, scaleBand, axisBottom, scaleLinear, max as _max, select, quickselect } from 'd3';



let BOTTOM_PADDING;
BOTTOM_PADDING = 50;
let LEFT_PADDING;
LEFT_PADDING = 25;
let RIGHT_PADDING;
RIGHT_PADDING = 10;
let TOP_PADDING;
TOP_PADDING = 10;
let HEIGHT;
HEIGHT = 300;
let WIDTH;
WIDTH = 400;


let usableHeight;
usableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
let usableWidth;
usableWidth = WIDTH - LEFT_PADDING - RIGHT_PADDING;


let allData;

allData = [
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

export let barPadding;
export let barWidth;
export let xScale;
export let yScale;
export let yAxisGroup;
export let xAxisGroup;

let colorScale;
colorScale = scaleOrdinal(schemePaired);

export const random = max => {
  return Math.floor(Math.random() * max + 1);
};

export function getRandomData() {
  const count = random(allData.length);
  const shuffled = allData.sort(() => 0.5 - Math.random());
  const data = shuffled.slice(0, count);
  data.sort((f1, f2) => f1.name.localeCompare(f2.name));
  for (const item of data) {
    item.score = random(10);
  }
  return data;
}
export function updateRect(rect) {
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

  const yAxis = axisLeft(yScale)
    .tickValues(tickValues)
    .tickFormat((n) => n.toFixed(0));

  yAxis(yAxisGroup);
}

 function getTextColor(bgColor) {
  let red = parseInt(bgColor.substring(1, 3), 16);
  let green = parseInt(bgColor.substring(3, 5), 16);
  let blue = parseInt(bgColor.substring(5, 7), 16);

  let luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance > 0.5 ? "black" : "white";
}

 function updateText(text) {
  text
    .attr("fill", (d) => {
      const barColor = colorScale(d.colorIndex);
      return getTextColor(barColor);
    })
    .text((d) => d.score)
    .attr("x", barWidth / 2) 
    .attr("y", (d) => TOP_PADDING + yScale(d.score) + 20);
}


 function updateXAxis(svg, data) {
  if (!xAxisGroup) {
    xAxisGroup = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${TOP_PADDING + usableHeight})`);
  }

  var xAxisScale = scaleBand()
    .domain(data.map((item) => item.name)) 
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  var xAxis = axisBottom(xAxisScale)
    .ticks(data.length);
  xAxis(xAxisGroup);
}

export default function updateData() {
  var data = getRandomData();

  barPadding = Math.ceil(30 / data.length);

  barWidth = usableWidth / data.length;

  xScale = scaleLinear()
    .domain([0, data.length])
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  var max = _max(data, (d) => d.score);
  yScale = scaleLinear().domain([0, max]).range([usableHeight, 0]);

  var svg = select("#chart").attr("width", WIDTH).attr("height", HEIGHT);

  var groups = svg
    .selectAll(".bar")
    .data(data, (d) => d.name)
    .join((enter) => {
      var groups = enter.append("g").attr("class", "bar");

      groups
        .append("rect")
        .attr("height", 0)
        .attr("y", TOP_PADDING + usableHeight);
      groups.append("text").attr("y", TOP_PADDING + usableHeight);

      return groups;
    });

  groups.attr("transform", (_, i) => `translate(${xScale(i)}, 0)`);

  updateRect(groups.select("rect"));

  updateText(groups.select("text"));

  updateYAxis(svg, data, max);

  updateXAxis(svg, data);
}

globalThis(updateData()); 

