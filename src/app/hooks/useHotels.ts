import { useInfiniteQuery } from "@tanstack/react-query";


type UseHotelsParams = {
  ss?: string; // location
  st?: string;
  startDate?: string;
  endDate?: string;
  roomCount?: number;
  adultCount?: number;
  childCount?: number;
  nightCount?: number;
  pt?: string;
  bt?: string;
  min_price?: number;
  max_price?: number;
};

const buildQueryUrl = (params: UseHotelsParams, page = 1): string => {
  const query = new URLSearchParams();
  if (params.ss) query.append("ss", params.ss);
  if (params.startDate) query.append("startDate", params.startDate);
  if (params.endDate) query.append("endDate", params.endDate);
  if (params.roomCount) query.append("roomCount", String(params.roomCount));
  if (params.adultCount) query.append("adultCount", String(params.adultCount));
  if (params.childCount) query.append("childCount", String(params.childCount));
   if (params.pt) query.append("pt", params.pt);
  if (params.bt) query.append("bt", params.bt); 
  if (params.min_price) query.append("min_price", String(params.min_price));
  if (params.max_price) query.append("max_price", String(params.max_price));

  query.append("page", String(page));

  return `api/hotels/?${query.toString()}`;
};

export const useHotels = (params: UseHotelsParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["hotels", params],
    queryFn: async ({ pageParam = 1 }) => {
      const url = buildQueryUrl(params, pageParam);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      return {
        count: data.count,
        hotels: data.results,
        nextPage: data.next ? pageParam + 1 : undefined, // You can also parse the actual ?page=X from data.next
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });
};
