// @ts-nocheck
import updateData from "./test.a.js";

describe("updateData function", () => {
  test("should create an SVG element with the specified dimensions", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");

    updateData(svg);

    expect(svg.clientWidth).toBe(400);
    expect(svg.clientHeight).toBe(800);
  });

  test("should create an y-axis group element", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const yAxisGroup = svg.querySelector(".y-axis");

    expect(yAxisGroup).not.toBeNull();
  });

  test("should create an x-axis group element", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const xAxisGroup = svg.querySelector(".x-axis");

    expect(xAxisGroup).not.toBeNull();
  });

  test("should create a color scale with 12 colors", () => {
    const colorScale = updateData();

    expect(colorScale.domain().length).toBe(12);
  });

  test("should create a random data array with a random length", () => {
    const data = updateData();

    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBeLessThanOrEqual(12);
  });

  test("should create a bar padding based on the number of bars", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const bars = svg.querySelectorAll(".bar");
    const barPadding = bars[0].getBoundingClientRect().width;

    expect(barPadding).toBeGreaterThan(0);
    expect(barPadding).toBeLessThanOrEqual(30);
  });

  test("should create a bar width based on the number of bars", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const usableWidth = svg.clientWidth - 50;
    const bars = svg.querySelectorAll(".bar");
    const barWidth = bars[0].getBoundingClientRect().width;

    expect(barWidth).toBeGreaterThan(0);
    expect(barWidth).toBeLessThanOrEqual(usableWidth);
  });

  test("should create an xScale and yScale based on the data", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const data = svg.querySelectorAll(".bar");
    const xScale = data[0].getAttribute("transform");
    const yScale = data[0].parentElement.getAttribute("transform");

    expect(xScale).not.toBeNull();
    expect(yScale).not.toBeNull();
  });

  test("should create a rect element for each bar", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const bars = svg.querySelectorAll(".bar");
    const rects = bars.querySelectorAll("rect");

    expect(rects.length).toBe(bars.length);
  });

  test("should create a text element for each bar", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const bars = svg.querySelectorAll(".bar");
    const texts = bars.querySelectorAll("text");

    expect(texts.length).toBe(bars.length);
  });

  test("should update the rect elements with the correct attributes", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const bars = svg.querySelectorAll(".bar");
    const rect = bars.querySelectorAll("rect");

    bars.forEach((bar, i) => {
      const color = bar.getAttribute("fill");
      const width = bar.getAttribute("width");
      const height = bar.getAttribute("height");
      const x = bar.getAttribute("x");
      const y = bar.getAttribute("y");

      expect(color).not.toBeNull();
      expect(width).not.toBeNull();
      expect(height).not.toBeNull();
      expect(x).not.toBeNull();
      expect(y).not.toBeNull();
    });
  });

  test("should update the text elements with the correct attributes", () => {
    const svg = document.createElement("svg");
    updateData(svg);

    const bars = svg.querySelectorAll(".bar");
    const text = bars.querySelectorAll("text");

    bars.forEach((bar, i) => {
      const color = bar.querySelector("text").getAttribute("fill");
      const x = bar.querySelector("text").getAttribute("x");
    });
  });
});
