import { DateRangeProvider } from "@/components/context/DateRangeContext";
import Dashboard from "@/components/dashboard/Dashboard";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>ScamHunt Dashboard</title>
      </Head>
      <DateRangeProvider>
        <Dashboard />
      </DateRangeProvider>
    </>
  );
};

export default Home;
