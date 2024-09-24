import { supabase } from "./client";
import { stripTimezone } from "./date";

export const getReportTimeSeries = async (
  platformName?: string,
  scamCategories?: string[],
  from?: Date,
  to?: Date,
  interval?: string
) => {
  const { data, error } = await supabase
    .rpc("get_report_time_series", {
      platform_name: platformName,
      scam_categories: scamCategories,
      from_date: stripTimezone(from),
      to_date: stripTimezone(to),
      interval,
    })
    .select("*");
  if (error) {
    throw error;
  }

  return data;
};
