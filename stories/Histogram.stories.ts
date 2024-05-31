import { Meta } from "@storybook/react";
import type { StoryObj } from "@storybook/react";

import type { HistogramChartStyleOptions } from "../lib";
import { HistogramChart } from "../lib";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Example/HistogramChart",
  component: HistogramChart,
} satisfies Meta<typeof HistogramChart>;

const dataOptions = {
  bins: { name: "bins", type: "string" },
  frequency: { name: "frequency" },
  breakBy: [],
};

const dataOptionsBreakBy = {
  bins: { name: "bins", type: "string" },
  frequency: { name: "frequency" },
  breakBy: [{ name: "group", type: "string" }],
};

const data = {
  columns: [
    { name: "bins", type: "string" },
    { name: "frequency", type: "number" },
    { name: "group", type: "string" },
  ],
  rows: [
    ["90-100", 5, "A"],
    ["80-89", 12, "A"],
    ["70-79", 8, "A"],
    ["60-69", 2, "A"],
    ["50-59", 1, "A"],
    ["40-49", 0, "A"],
    ["90-100", 2, "B"],
    ["80-89", 4, "B"],
    ["70-79", 10, "B"],
    ["60-69", 8, "B"],
    ["50-59", 3, "B"],
    ["40-49", 1, "B"],
  ],
};

const styleOptions: HistogramChartStyleOptions = {
  subtype: "stacked",
  xAxis: {
    enabled: true,
    gridLines: true,
    title: {
      enabled: true,
      text: "Bins",
    },
  },
  yAxis: {
    enabled: true,
    gridLines: true,
    title: {
      enabled: true,
      text: "Frequency",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Basic: Story = {
  args: {
    dataSet: data,
    dataOptions,
  },
};

export const Styles: Story = {
  args: {
    dataSet: data,
    dataOptions,
    styleOptions: styleOptions,
  },
};

export const BreakBy: Story = {
  args: {
    dataSet: data,
    dataOptions: dataOptionsBreakBy,
    styleOptions: styleOptions,
  },
};
