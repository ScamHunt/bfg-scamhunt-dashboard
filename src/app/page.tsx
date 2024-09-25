import { DateRangeProvider } from "@/components/context/DateRangeContext";
import Dashboard from "@/components/dashboard/Dashboard";

const Home = () => {
  return (
    <DateRangeProvider>
      <Dashboard />
    </DateRangeProvider>
  );
};

export default Home;
