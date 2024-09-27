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
  getScamUrls,
} from "@/utils/supabase/reports";
import {
  Barchart,
  ReportTimeSeriesChart,
  ScamPieChart,
  ScamLink,
  LinkTable,
} from "./Charts";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DatePickerButton } from "./DatePickerButton";

const Dashboard = () => {
  const [reportCount, setReportCount] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [reportByPlatform, setReportByPlatform] = useState<Array<object>>([]);
  const [scamDistribution, setScamDistribution] = useState<
    { scam_type: string; count: number }[]
  >([]);
  const [scamLinks, setScamLinks] = useState<ScamLink[]>([]);
  const [likelyScams, setLikelyScams] = useState<number>(0);
  const [timeSeries, setTimeSeries] =
    useState<[{ report_date: string; report_count: string }]>();

  const { dateRange } = useDateRange();

  const getReportCount = async () => {
    const { data } = await applyDateRange(
      supabase.from("report").select("*"),
      dateRange
    );
    setReportCount(data ? data.length : 0);
    return data;
  };

  const getActiveUsers = async () => {
    const { data } = await applyDateRange(
      supabase.from("user").select("*"),
      dateRange
    );
    setTotalUsers(data ? data.length : 0);
    return data;
  };

  const getReportByPlatform = async () => {
    const { data } = await getReportByPlatforms({
      from: dateRange?.from,
      to: dateRange?.to,
    });
    setReportByPlatform(data as any);
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

  const getScamLinks = async () => {
    const { data } = await getScamUrls({
      from: dateRange?.from,
      to: dateRange?.to,
    });
    setScamLinks(data as any);
    return data;
  };

  useEffect(() => {
    getReportCount();
    getActiveUsers();
    getReportChart();
    getReportByPlatform();
    getScamBreakdown();
    getLikelyScams();
    getScamLinks();
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
            <div className='flex items-center space-x-4'>
              <div className='flex items-center'>
                <span className='text-sm font-medium'>
                  {dateRange?.from && dateRange?.to
                    ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    : "No date range selected"}
                </span>
              </div>
              <DatePickerButton />
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <NumberCard
              content={[
                { title: "Total Reports", data: reportCount.toString() },
                { title: "Total Users", data: totalUsers.toString() },
                {
                  title: "Most Reported Scam Category",
                  data:
                    scamDistribution.reduce(
                      (max, current) =>
                        current.count > max.count ? current : max,
                      scamDistribution[0]
                    )?.["scam_type"] || "N/A",
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
            <LinkTable scamLinks={scamLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
