import { useQuery } from "@tanstack/react-query";
import { Hotel, Room } from "../utils/types";

type UseHotelsParams = {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  adultCount?: number;
  childCount?: number;
  roomCount?: number;
  propertyTypes?: string[];
  minPrice?: number;
  maxPrice?: number;
};

const normalize = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "");

const matchesLocation = (hotel: Hotel | undefined, location: string) => {
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

const satisfiesAgeRestriction = (
  ageRestriction: string | undefined,
  adultCount: number,
  childCount: number
): boolean => {
  const restriction = parseInt(ageRestriction || "0", 10);

  // If there's a restriction like "18", don't allow children
  if (!isNaN(restriction) && childCount > 0) {
    return false;
  }

  return true;
};

export const useHotels = ({
  location,
  startDate,
  endDate,
  adultCount,
  childCount,
  roomCount,
  propertyTypes,
  minPrice,
  maxPrice,
}: UseHotelsParams = {}) => {
  return useQuery({
    queryKey: [
      "hotels",
      location,
      startDate?.toISOString(),
      endDate?.toISOString(),
      adultCount,
      childCount,
      roomCount,
      propertyTypes,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const res = await fetch("/api/hotels");
      const data = await res.json();
      let results = data.results;

      // Location filtering
      if (location) {
        results = results.filter((hotel: Hotel) =>
          hotel.rooms?.some((room: Room) =>
            matchesLocation(room.hotel, location)
          )
        );
      }

      // Date range filtering
      if (startDate && endDate) {
        results = results.filter((hotel: Hotel) =>
          hotel.rooms?.some((room: Room) =>
            room.late_night_date?.some((dateObj) => {
              const d = new Date(dateObj.late_night_date);
              return d >= startDate && d <= endDate;
            })
          )
        );
      }

      // Combined capacity filtering
      if (
        adultCount !== undefined ||
        childCount !== undefined ||
        roomCount !== undefined
      ) {
        const requiredPeople = (adultCount || 0) + (childCount || 0);
        const requiredRooms = roomCount || 1;

        results = results.filter((hotel: Hotel) =>
          hotel.rooms?.some((room: Room) => {
            const capacityPerRoom = room.rooms_capacity ?? 0;
            const availableRooms = room.number_of_rooms ?? 0;
            const totalCapacity = capacityPerRoom * availableRooms;

            const isAllowed = satisfiesAgeRestriction(
              hotel.age_restriction,
              adultCount || 0,
              childCount || 0
            );


            return (
              isAllowed &&
              availableRooms >= requiredRooms &&
              totalCapacity >= requiredPeople
            );
          })
        );
      }
// Property type filter (Hotel / Apartment)
if (propertyTypes?.length) {
  results = results.filter((hotel: Hotel) =>
    hotel.rooms?.some((room: Room) =>
      propertyTypes.some((type) =>
        room.room_name?.toLowerCase().includes(type.toLowerCase())
      )
    )
  );
}

// Price range filter
results = results.filter((hotel: Hotel) =>
  hotel.rooms?.every((room: Room) => {
    const price = room.rooms_rates_per_night ?? 0;
    return price >= minPrice! && price <= maxPrice!;
  })
);


      return results;
    },
    staleTime: 5 * 60 * 1000,
  });
};
