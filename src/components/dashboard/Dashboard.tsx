"use client";

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
import { Barchart, ReportTimeSeriesChart, ScamPieChart } from "./Charts";

const Dashboard = () => {
  const [reportCount, setreportCount] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [reportByPlatform, setreportByPlatform] = useState<Array<object>>([]);
  const [scamDistribution, setScamDistribution] = useState<
    { scam_type: string; count: number }[]
  >([]);
  const [likelyScams, setLikelyScams] = useState<number>(0);
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
    setTotalUsers(data ? data.length : 0);
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
    setScamDistribution(data as any);
  };

  const getLikelyScams = async () => {
    const { data } = await applyDateRange(
      supabase.from("report").select("*").gte("scam_likelihood", 85),
      dateRange
    );
    setLikelyScams(data ? data.length : 0);
    return data;
  };

  useEffect(() => {
    getReportCount();
    getActiveUsers();
    getReportChart();
    getReportByPlatform();
    getScamBreakdown();
    getLikelyScams();
  }, [dateRange]);

  return (
    <div className='min-h-screen'>
      <div className='bg-off-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <Navbar />
        <div className='p-8'>
          <div className='flex items-center justify-between mb-8'>
            <p className='mr-4'>
              User reported potential scam posts on social media using
              <a
                className='mx-1 text-blue-500 hover:text-blue-600'
                href='https://t.me/scamhunt_bot'
                target='_blank'
                rel='noopener noreferrer'
              >
                @ScamHunt_bot
              </a>
              on Telegram
            </p>
            <DatePickerWithRange className='mb-0' />
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <NumberCard
              content={[
                { title: "Total Reports", data: reportCount.toString() },
                { title: "Total Users", data: totalUsers.toString() },
                {
                  title: "Most Reported Scam Category",
                  data: (scamDistribution[0]?.["scam_type"] as string) || "N/A",
                },
              ]}
            />
            <ReportTimeSeriesChart
              title='Reports Over Time'
              data={timeSeries as object[]}
              xAxisKey='report_date'
              dataKey='report_count'
            />
            <Barchart
              title='Reports By Platform'
              data={reportByPlatform}
              xAxisKey='platform_name'
              dataKey='count'
            />
            <ScamPieChart
              title='Potential Scams Breakdown'
              data={scamDistribution}
              dataKey='count'
              xAxisKey='scam_type'
            />
            <ScamPieChart
              title='Potential Scams Likeliness'
              data={[
                { scam_type: "Likely Scam", count: likelyScams },
                {
                  scam_type: "Not Likely Scam",
                  count: reportCount - likelyScams,
                },
              ]}
              dataKey='count'
              xAxisKey='scam_type'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
