import { supabase } from "./client";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js/";
import { DateRange } from "react-day-picker";

export const applyDateRange = async (
  query: PostgrestFilterBuilder<any, any, any>,
  range: DateRange | undefined
) => {
  if (!range) return query;
  return query
    .gte("created_at", range?.from?.toISOString())
    .lte("created_at", range?.to?.toISOString());
};

export const stripTimezone = (date: Date | undefined) =>
  date ? new Date(date.toISOString().split("T")[0]) : null;
