// import { useQuery } from '@tanstack/react-query';

// const fetchHotels = async () => {
//   const res = await fetch("https://sandbox.thetravelhunters.com/hotel/hotels/");
//   if (!res.ok) throw new Error("Failed to fetch hotels");
//   const data = await res.json();
//   return data.results; 
// };

// export const useHotels = () => {
//   return useQuery({
//     queryKey: ['hotels'],
//     queryFn: fetchHotels,
   
//   });
// };

import { useQuery } from "@tanstack/react-query";

type UseHotelsParams = {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  rooms?: number;
};

const normalize = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z]/g, "");

const matchesLocation = (hotel: any, location: string) => {
  const target = normalize(location);

  const fields = [
    hotel?.location_city,
    hotel?.location_state,
    hotel?.location_country,
    hotel?.state?.name,
    hotel?.state?.slug,
    hotel?.district?.name,
    hotel?.district?.state?.name,
    hotel?.district?.state?.slug,
    hotel?.country?.name,
  ];

  return fields.some((field) => normalize(field || "") === target);
};

export const useHotels = ({ location, startDate, endDate, rooms }: UseHotelsParams = {}) => {
  return useQuery({
    queryKey: ['hotels', location, startDate?.toISOString(), endDate?.toISOString(), rooms],
    queryFn: async () => {
      const res = await fetch("https://sandbox.thetravelhunters.com/hotel/hotels/");
      const data = await res.json();
      let results = data.results;

      // Location filtering
      if (location) {
        results = results.filter(hotel =>
          hotel.rooms?.some((room: any) =>
            matchesLocation(room.hotel, location)
          )
        );
      }

      // Date range filtering
      if (startDate && endDate) {
        results = results.filter(hotel =>
          hotel.rooms?.some((room: any) =>
            room.late_night_date?.some((dateObj: any) => {
              const d = new Date(dateObj.late_night_date);
              return d >= startDate && d <= endDate;
            })
          )
        );
      }

      // Rooms filtering
      if (rooms !== undefined) {
        results = results.filter(hotel =>
          hotel.rooms?.length >= rooms
        );
      }

      return results;
    },
    staleTime: 5 * 60 * 1000,
  });
};
