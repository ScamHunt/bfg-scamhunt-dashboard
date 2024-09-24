import { supabase } from './client'
import { PostgrestFilterBuilder, } from '@supabase/postgrest-js/'
import { DateRange } from "react-day-picker";

export const applyDateRange = async (query: PostgrestFilterBuilder<any, any, any>, range: DateRange) => {
    return query
        .gte("created_at", range?.from?.toISOString())
        .lte("created_at", range?.to?.toISOString());
}
