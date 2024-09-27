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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

interface ChartProps {
  title: string;
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
const getSeverityColor = (confidenceLevel: string) => {
  switch (confidenceLevel.toLowerCase()) {
    case "extremely_high":
      return "bg-red-600";
    case "high":
      return "bg-red-400";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const renderThreatBadge = (
  riskScores: { threat_type: string; confidence_level: string }[],
  threatType: string
) => {
  const score = riskScores.find((score) => score.threat_type === threatType);
  if (!score) return <Badge className='bg-gray-500'>N/A</Badge>;

  const severityColor = getSeverityColor(score.confidence_level);
  return (
    <Badge className={`${severityColor} text-white`}>
      {score.confidence_level}
    </Badge>
  );
};

export const Barchart = ({ title, data, xAxisKey, dataKey }: ChartProps) => {
  return (
    <Card key={`barchart-${title}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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

export const ReportTimeSeriesChart = ({
  title,
  data,
  xAxisKey,
  dataKey,
}: ChartProps) => {
  return (
    <Card key={`timeseries-${title}`} className='col-span-2'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <LineChart data={data}>
            <XAxis name='Date' dataKey={xAxisKey} />
            <YAxis name='Count' />
            <Tooltip
              labelFormatter={(value: string) => {
                return new Date(value).toLocaleDateString();
              }}
            />
            <Line
              type='monotone'
              name='Reports'
              dataKey={dataKey}
              strokeWidth={2}
              stroke='#8884d8'
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const ScamPieChart = ({
  title,
  data,
  xAxisKey,
  dataKey,
}: ChartProps) => {
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

  data.forEach((item: any) => {
    //give a random color
    item.fill = colors[Math.floor(Math.random() * colors.length)];
  });
  return (
    <Card key={`piechart-${title}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-[300px] w-full'>
          <PieChart>
            <Pie
              data={data.map((item, index) => ({
                ...item,
                fill: colors[index % colors.length],
              }))}
              dataKey={dataKey}
              nameKey={xAxisKey}
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

export interface ScamLink {
  url: string;
  redirects: string[];
  risk_scores: { threat_type: string; confidence_level: string }[];
}
export const LinkTable = ({ scamLinks }: { scamLinks: ScamLink[] }) => {
  const uniqueLinks = Array.from(
    new Set(scamLinks.map((link) => link.url))
  ).map((url) => scamLinks.find((link) => link.url === url)!);

  const countDuplicateSites = (url: string) => {
    return scamLinks.filter((link) => link.url === url).length;
  };

  return (
    <Card key='scam-links-table' className='col-span-2'>
      <CardHeader>
        <CardTitle>Potential Scam Links From Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='max-h-[400px] overflow-y-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Redirects</TableHead>
                <TableHead>Unwanted Software</TableHead>
                <TableHead>Social Engineering</TableHead>
                <TableHead>Malware</TableHead>
                <TableHead>Occurrences</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uniqueLinks.map((link, index) => (
                <TableRow key={index}>
                  <TableCell>{link.url}</TableCell>
                  <TableCell>{link.redirects.length}</TableCell>
                  <TableCell>
                    {renderThreatBadge(link.risk_scores, "UNWANTED_SOFTWARE")}
                  </TableCell>
                  <TableCell>
                    {renderThreatBadge(link.risk_scores, "SOCIAL_ENGINEERING")}
                  </TableCell>
                  <TableCell>
                    {renderThreatBadge(link.risk_scores, "MALWARE")}
                  </TableCell>
                  <TableCell>{countDuplicateSites(link.url)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
