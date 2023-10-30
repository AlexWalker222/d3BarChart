// @ts-nocheck
import updateData from "app.js";

describe("updateData", () => {
  test("should create an SVG element with the correct dimensions", () => {
    const svg = document.create("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild(svg);

    updateData();
    expect(svg.clientWidth).toBe(400);
    expect(svg.clientHeight).toBe(800);

    document.body.removeChild(svg);
  });
  test("should create an x-axis group element", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild(svg);

    updateData();

    const xAxisGroup = svg.querySelector("x-axis");

    expect(xAxisGroup).not.toBeNull();

    document.body.removeChild(svg);
  });

  test("should create a y-axis group element", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild(svg);

    updateData();

    const yAxisGroup = svg.querySelector(".y-axis");

    expect(yAxisGroup).not.toBeNull();

    document.body.removeChild(svg);
  });
  test("should create a group element for each bar", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild(svg);

    updateData();

    const bars = svg.querySelectorAll(".bar");

    expect(bars.length).toBe(12);

    document.body.removeChild(svg);
  });
  test("should create a rect element for each bar;", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild(svg);

    updateData();

    const bars = svg.querySelectorAll(".bar");

    for (let bar of bars) {
      expect(bar.querySelector("rect")).not.toBeNull();
    }

    document.body.removeChild(svg);
  });

  test("should create a text element for each bar", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild("svg");

    updateData();

    const bars = svg.querySelectorAll(".bar");

    for (let bar of bars) {
      expect(bar.querySelector("text")).not.toBeNull();
    }

    document.body.removeChild(svg);
  });

  test("should set the fill color of each bar based on its color index", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild("svg");

    updateData();

    const bars = svg.querySelectorAll(".bar");

    for (let bar of bars) {
      const color = bar.getAttribute("fill ");
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    }

    document.body.removeChild("svg");
  });
  test("should set the width of each bar", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild("svg");

    updateData();

    const bars = svg.querySelectorAll(".bar");

    for (let bar of bars) {
      const width = bar.querySelectorAll("rect").getAttribute("width");
      expect(width).toBe("30");
    }

    document.body.removeChild("svg");
  });

  test("should set the height of each bar based on its score", () => {
    const svg = document.createElement("svg");
    svg.setAttribute("width", "400");
    svg.setAttribute("height", "800");
    document.body.appendChild("svg");

    updateData();

    const bars = svg.querySelector(".bar");

    for (let bar of bars) {
      const height = bar.querySelector("rect").getAttribute("height");
      expect(height).toMatch(/^\d+$/);
    }
  });
});
