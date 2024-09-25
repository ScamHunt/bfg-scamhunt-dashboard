"use client";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { NumberCard } from "@/components/dashboard/NumberCard";
import { Navbar } from "@/components/navbar";
import { DatePickerWithRange } from "../ui/date-picker";
import { applyDateRange } from "@/utils/supabase/date";
import { useDateRange } from "../context/DateRangeContext";
import {
  getReportByPlatforms,
  getReportTimeSeries,
  getScamDistributions,
} from "@/utils/supabase/reports";
// import { DatePickerWithRange } from "../ui/date-picker";
import { Barchart, ReportTimeSeriesChart, ScamBreakdownChart } from "./Charts";

const Dashboard = () => {
  const [reportCount, setreportCount] = useState<number>(0);
  const [activeUsers, setactiveUsers] = useState<number>(0);
  const [reportByPlatform, setreportByPlatform] = useState<Array<object>>([]);
  const [scamDistribution, setScamDistribution] = useState<Array<object>>([]);
  const [timeSeries, setTimeSeries] =
    useState<[{ report_date: string; report_count: string }]>();

  const { dateRange } = useDateRange();

  const getReportCount = async () => {
    const { data } = await applyDateRange(
      supabase.from("report").select("*"),
      dateRange
    );
    setreportCount(data ? data.length : 0);
    return data;
  };

  const getActiveUsers = async () => {
    const { data } = await supabase.from("user").select("*");
    setactiveUsers(data ? data.length : 0);
    return data;
  };

  const getReportByPlatform = async () => {
    const { data } = await getReportByPlatforms({
      from: dateRange?.from,
      to: dateRange?.to,
    });
    setreportByPlatform(data as any);
    return data;
  };

  const getReportChart = async () => {
    const { data } = await getReportTimeSeries({
      from: dateRange?.from,
      to: dateRange?.to,
    });
    setTimeSeries(data as any);
  };

  const getScamBreakdown = async () => {
    const { data } = await getScamDistributions({
      from: dateRange?.from,
      to: dateRange?.to,
    });
    console.log(data);
    setScamDistribution(data as any);
  };

  useEffect(() => {
    getReportCount();
    getActiveUsers();
    getReportChart();
    getReportByPlatform();
    getScamBreakdown();
  }, [dateRange]);

  return (
    <div className='min-h-screen'>
      <div className='bg-off-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <Navbar />
        <div className='p-8'>
          <h1 className='text-3xl font-bold mb-8'>Scam Report Dashboard</h1>
          <DatePickerWithRange className='mb-6' />
          <Tabs defaultValue='reports' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
              <TabsTrigger value='users'>Users</TabsTrigger>
            </TabsList>
            <TabsContent value='reports' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <NumberCard
                  title={"Total Reports"}
                  content={reportCount}
                  subtitle=''
                />
                <ReportTimeSeriesChart
                  data={timeSeries as object[]}
                  xAxisKey='report_date'
                  dataKey='report_count'
                />
                <Barchart
                  data={reportByPlatform}
                  xAxisKey='platform_name'
                  dataKey='count'
                />
                <ScamBreakdownChart
                  data={scamDistribution}
                  dataKey='count'
                  xAxisKey='scam_type'
                />
              </div>
            </TabsContent>
            <TabsContent value='users' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <NumberCard
                  title={"Active Users"}
                  content={activeUsers}
                  subtitle=''
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
