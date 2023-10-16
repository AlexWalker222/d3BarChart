import * as d3 from 'd3';
import './barchart.css';
import { __esModule } from '@babel/core/lib/config/files/package';

// Later these will be adjusted to make room
// for a vertical and horizontal axis.
const BOTTOM_PADDING = 50;
const LEFT_PADDING = 25;
const RIGHT_PADDING = 10;
const TOP_PADDING = 10;

// Full size of the svg element.
const HEIGHT = 300;
const WIDTH = 400;

// Size that can be used for the bars.
const usableHeight = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
const usableWidth = WIDTH - LEFT_PADDING - RIGHT_PADDING;

// Random data will be selected from this array.
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

// Variables for functions.
let barPadding;
let barWidth;
let xScale;
let yScale;
let yAxisGroup;
let xAxisGroup;

// This is used to select bar colors based on their colorIndex.
const colorScale = d3.scaleOrdinal(d3.schemePaired); // 12 colors

// This returns a random integer from 1 to max inclusive.
const random = (max) => Math.floor(Math.random() * max + 1);

// This returns an array of objects taken from allData.
// A "score" property with a random value from 1 to 10
// is added to each object.
function getRandomData() {
  const count = random(allData.length);
  const shuffled = allData.sort(() => 0.5 - Math.random());
  const data = shuffled.slice(0, count);
  data.sort((f1, f2) => f1.name.localeCompare(f2.name));
  for (const item of data) {
    item.score = random(10);
  }
  return data;
}

// This updates the attributes of an SVG rect element
// that represents a bar.
function updateRect(rect) {
  rect
    // Each fruit will keep the same color as its score changes.
    .attr("fill", (d) => colorScale(d.colorIndex))
    .attr("width", barWidth - barPadding * 2)
    .attr("height", (d) => usableHeight - yScale(d.score))
    .attr("x", barPadding)
    .attr("y", (d) => TOP_PADDING + yScale(d.score));
}

// This updates the yAxis to display the ticks in the
// correct position when the bar is drawn to the screen.
function updateYAxis(svg, data, max) {
  if (!yAxisGroup) {
    // Create an SVG group that will hold the y axis and
    // translate the group to the appropriate position in the SVG.
    yAxisGroup = svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${LEFT_PADDING}, ${TOP_PADDING})`);
  }

  // Create an array with values from zero to max
  // that will be used as the tick values on the y axis.
  const tickValues = Array.from(Array(max + 1).keys());

  // Create an axis generator function that renders the yAxis.
  const yAxis = d3
    .axisLeft(yScale)
    .tickValues(tickValues)
    .tickFormat((n) => n.toFixed(0));

  // Pass the selection for the group to the
  // axis generator function to render it.
  yAxis(yAxisGroup);
  // An equivalent way to do this is yAxisGroup.call(yAxis);
}

// This returns a text color to use on a given background color.
function getTextColor(bgColor) {
  // Convert the hex background color to its decimal components.
  const red = parseInt(bgColor.substring(1, 3), 16);
  const green = parseInt(bgColor.substring(3, 5), 16);
  const blue = parseInt(bgColor.substring(5, 7), 16);

  // Compute the "relative Luminance".
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  // Use dark text on Light backgrounds and vice versa.
  return luminance > 0.5 ? "black" : "white";
}

// This is for updating the text for a specific bar.
function updateText(text) {
  text
    .attr("fill", (d) => {
      const barColor = colorScale(d.colorIndex);
      return getTextColor(barColor);
    })
    .text((d) => d.score)
    .attr("x", barWidth / 2) // center horizontally in bar
    .attr("y", (d) => TOP_PADDING + yScale(d.score) + 20); // just below top
}

// This updates the x-axis so that it displays the tick values
// also to display the fruit names.
function updateXAxis(svg, data) {
  if (!xAxisGroup) {
    xAxisGroup = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${TOP_PADDING + usableHeight})`);
  }
  // This ^ creates an SVG group that will hold the x axis and
  // translate the group to the appropriate position in the SVG.

  // Create a scale that maps fruit names to positions on x axis.
  const xAxisScale = d3
    .scaleBand()
    .domain(data.map((item) => item.name)) // fruit names
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  // Create and call an axis generator function that renders the xAxis.
  const xAxis = d3.axisBottom(xAxisScale).ticks(data.length);
  xAxis(xAxisGroup);
}

// This updates the bar chart with random data.
function updateData() {
  const data = getRandomData();

  // Calculate padding on sides of bars based on # of bars.
  barPadding = Math.ceil(30 / data.length);

  // Calculate the width of each bar based on # of bars.
  barWidth = usableWidth / data.length;

  // Create a scale to map data index values to x coordinates.
  // This is a function that takes a value in the "domain"
  // and returns a value in the "range".
  xScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([LEFT_PADDING, LEFT_PADDING + usableWidth]);

  // Create a scale to map data score values to y coordinates.
  // The range is flipped to account for
  // the SVG origin being in the upper left corner.
  // Like xScale, this is a function that takes a value in the "domain"
  // and returns a value in the "range".
  // The d3.max function computes the largest data value in a given array
  // where values are computed by the 2nd argument function.
  const max = d3.max(data, (d) => d.score);
  yScale = d3.scaleLinear().domain([0, max]).range([usableHeight, 0]);

  // Create a D3 selection object that represents the svg element
  // and set the size of the svg element.
  const svg = d3.select("#chart").attr("width", WIDTH).attr("height", HEIGHT);

  // This is the most critical part to understand!
  // You learned about about selections and the general update pattern
  // in the previous section.
  const groups = svg
    .selectAll(".bar")
    .data(data, (d) => d.name)
    .join((enter) => {
      // Create a new SVG group element for each placeholder
      // to represent a new bar.
      // For now the only thing in each group will be a rect element,
      // but later we will add a text element to display the value.
      const groups = enter.append("g").attr("class", "bar");

      // Create a new SVG rect element for each group.
      groups
        .append("rect")
        .attr("height", 0)
        .attr("y", TOP_PADDING + usableHeight);
      // Create a new SVG element for each group
      groups.append("text").attr("y", TOP_PADDING + usableHeight);

      return groups;
    });
  // The join method call above returns a selection that combines
  // the update and enter sub-selections into its update selection.
  // This allows operations needed on elements in both
  // to be performed on the new selection.

  // Translate the groups for each bar to their
  // appropriate x coordinate based on its index.
  groups.attr("transform", (_, i) => `translate(${xScale(i)}, 0)`);

  // Update all the rect elements using their newly associated data.
  updateRect(groups.select("rect"));

  // Update all the text elements using their newly associated data.
  updateText(groups.select("text"));

  // Update the yAxis using their newly associated yAxis attributes & data.
  updateYAxis(svg, data, max);

  // update the xAxis using their newly associated xAxis attributes & data.
  updateXAxis(svg, data);
}

// Render the first version of the chart.
updateData();

// do i need to export this function to make this work in build mode for githubpages
export default function() {
  updateRect(groups.select("rect")); // Update the position of the rect element.
  updateData(); // Update the data displayed on the page.
  updateText(groups.select("text")); // Update the position of the text element.
  updateYAxis(svg, data, max); // Update the position of the y-axis.
  updateXAxis(svg, data); // Update the position of the x-axis.

};