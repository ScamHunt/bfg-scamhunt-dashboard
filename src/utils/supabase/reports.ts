import { supabase } from "./client";
import { stripTimezone } from "./date";

export const getReportTimeSeries = async (config: {
  platformName?: string;
  scamCategories?: string[];
  from?: Date;
  to?: Date;
  interval?: string;
}) => {
  const data = await supabase
    .rpc("get_report_time_series", {
      platform_name: config.platformName,
      scam_categories: config.scamCategories,
      from_date: stripTimezone(config.from),
      to_date: stripTimezone(config.to),
      interval: config.interval,
    })
    .select("*");

  return data;
};
