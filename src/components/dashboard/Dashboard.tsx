"use client";

import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { NumberCard } from "@/components/dashboard/NumberCard";
import { Navbar } from "@/components/navbar";
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
import { DatePickerButton } from "./DatePickerButton";
import { format } from "date-fns"; // Add this import

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
    const { count } = await applyDateRange(
      supabase.from("report").select("*", { count: "exact" }),
      dateRange
    );
    setReportCount(count as number);
    return count;
  };

  const getActiveUsers = async () => {
    const { count } = await applyDateRange(
      supabase.from("user").select("*", { count: "exact" }),
      dateRange
    );
    setTotalUsers(count as number);
    return count;
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

  // Add this function to format dates consistently
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy");
  };

  return (
    <div className='min-h-screen'>
      <div className='bg-off-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <Navbar />
        <div className='p-8'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0'>
            <p className='mr-4 mb-2 sm:mb-0'>
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
            <div className='flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4'>
              <div className='flex items-center'>
                <span className='text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-none'>
                  {dateRange?.from && dateRange?.to
                    ? `${formatDate(dateRange.from)} - ${formatDate(
                        dateRange.to
                      )}`
                    : "No date range selected"}
                </span>
              </div>
              <DatePickerButton />
            </div>
          </div>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            <NumberCard
              className='col-span-1 sm:col-span-2 lg:col-span-1'
              content={[
                { title: "Total Reports", data: reportCount.toString() },
                { title: "Total Reporters", data: totalUsers.toString() },
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
              className='col-span-1 sm:col-span-2'
              title='Reports Over Time'
              data={timeSeries as object[]}
              xAxisKey='report_date'
              dataKey='report_count'
            />
            <Barchart
              className='col-span-1 sm:col-span-2 lg:col-span-1'
              title='Reports By Platform'
              data={reportByPlatform}
              xAxisKey='platform_name'
              dataKey='count'
            />
            <ScamPieChart
              className='col-span-1 sm:col-span-1'
              title='Potential Scams Breakdown'
              data={scamDistribution}
              dataKey='count'
              xAxisKey='scam_type'
            />
            <ScamPieChart
              className='col-span-1 sm:col-span-1'
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
            <LinkTable
              scamLinks={scamLinks}
              className='col-span-1 sm:col-span-2'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
