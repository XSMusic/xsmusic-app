export interface AnalyticsGetVisitsResponse {
  date: string;
  items: { name: string; value: number }[];
}

export interface AnalyticsGetEventsWithCategoriesResponse {
  name: string;
  total: number;
  items: { name: string; value: number }[];
}
