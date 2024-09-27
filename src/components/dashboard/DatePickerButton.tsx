import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDateRange } from "@/components/context/DateRangeContext";
import { addDays, subDays } from 'date-fns';

export const DatePickerButton: React.FC = () => {
  const { setDateRange } = useDateRange();

  const handleTabChange = (value: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let from: Date;

    switch (value) {
      case '1d':
        from = subDays(today, 1);
        break;
      case '2d':
        from = subDays(today, 2);
        break;
      case '3d':
        from = subDays(today, 3);
        break;
      case '1w':
        from = subDays(today, 7);
        break;
      case '2w':
        from = subDays(today, 14);
        break;
      case '1m':
        from = subDays(today, 30);
        break;
      default:
        from = subDays(today, 7);
    }

    setDateRange({ from, to: today });
  };

  return (
    <Tabs defaultValue="1w" className="mb-0" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="1d">1d</TabsTrigger>
        <TabsTrigger value="2d">2d</TabsTrigger>
        <TabsTrigger value="3d">3d</TabsTrigger>
        <TabsTrigger value="1w">1w</TabsTrigger>
        <TabsTrigger value="2w">2w</TabsTrigger>
        <TabsTrigger value="1m">1m</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
