"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardContent,CardFooter,CardDescription } from "../ui/card";

import {   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent, } from "@/components/ui/chart"
import React from "react"
 







interface BarChartProps {
  data: object[],
  xAxisKey: string,
  dataKey: string
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
} satisfies ChartConfig

const Barchart = ({data, xAxisKey,dataKey}: BarChartProps) => {
    return (
 <Card>
      <CardHeader>
        <CardTitle>Reports By Platform </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
            <Bar dataKey={dataKey} fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
      </CardFooter>
    </Card>
   
      );
}
 
export default Barchart;


