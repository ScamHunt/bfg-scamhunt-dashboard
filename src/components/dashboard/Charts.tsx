"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

interface ChartProps {
  data: object[];
  xAxisKey?: string;
  dataKey: string;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const Barchart = ({ data, xAxisKey, dataKey }: ChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports By Platform </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} fill='var(--color-desktop)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'></CardFooter>
    </Card>
  );
};

export const ReportTimeSeriesChart = (props: ChartProps, className: string) => {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle>Reports Over Time</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <LineChart data={props.data}>
            <XAxis name='Date' dataKey={props.xAxisKey} />
            <YAxis name='Count' />
            <Tooltip
              labelFormatter={(value: string) => {
                return new Date(value).toLocaleDateString();
              }}
            />
            <Line
              type='monotone'
              name='Reports'
              dataKey={props.dataKey}
              strokeWidth={2}
              stroke='#8884d8'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const ScamBreakdownChart = (props: ChartProps) => {
  // a list of 10 nice colors, not too bright and pleasant to the eye.
  let colors = [
    "#264653",
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
    "#f9c74f",
    "#90be6d",
    "#f4a261",
    "#f4a261",
    "#f4a261",
  ];

  props.data.forEach((item: any) => {
    //give a random color
    item.fill = colors[Math.floor(Math.random() * colors.length)];
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Potential Scams Breakdown</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <PieChart>
            <Pie
              data={props.data}
              dataKey={props.dataKey}
              nameKey={props.xAxisKey}
              stroke='#ffffff'
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
