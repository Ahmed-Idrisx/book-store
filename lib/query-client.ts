import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // to avoid refetching data on every page navigation, we can set a stale time for the queries. This means that the data will be considered fresh for a certain period of time, and React Query will not refetch it during that time.
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});
