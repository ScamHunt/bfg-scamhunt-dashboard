"use client";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { NumberCard } from "@/components/dashboard/NumberCard";
import { Navbar } from "@/components/navbar";
import { DatePickerWithRange } from "../ui/date-picker";
import { useDateRange } from "../context/DateRangeContext";

const Dashboard = () => {
  const [reportCount, setreportCount] = useState<number>(0);
  const [activeUsers, setactiveUsers] = useState<number>(0);

  const { dateRange } = useDateRange();

  const getReportCount = async () => {
    const { data } = await supabase
      .from("report")
      .select("*")
      .gte("created_at", dateRange?.from?.toISOString())
      .lte("created_at", dateRange?.to?.toISOString());
    setreportCount(data ? data.length : 0);
    return data;
  };

  const getActiveUsers = async () => {
    const { data } = await supabase.from("user").select("*");
    console.log(data);
    setactiveUsers(data ? data.length : 0);
    return data;
  };

  const getTop = async () => {
    const { data } = await supabase.from("user").select("*");
    console.log(data);
    setactiveUsers(data ? data.length : 0);
    return data;
  };

  useEffect(() => {
    console.log("rendered");
    getReportCount();
    getActiveUsers();
  }, []);

  return (
    <div className={`min-h-screen `}>
      <div className='bg-off-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
        <Navbar />
        <div className='p-8'>
          <h1 className='text-3xl font-bold mb-8'>Scam Report Dashboard</h1>
          <DatePickerWithRange className='mb-6' />
          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics'>Analytics</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <NumberCard
                  title={"Total Reports"}
                  content={reportCount}
                  subtitle=''
                />
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
