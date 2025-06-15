"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchForm from "@/app/components/searchForm";
import { useSearchParams } from "next/navigation";
import { useHotels } from "@/app/hooks/useHotels";
import { Hotel } from "@/app/utils/types";
import FilterForm from "@/app/components/filterForm";
import HotelCard from "@/app/components/hotelCard";
import FilterModal from "./FilterModal";

const HotelList = () => {
  const params = useSearchParams();
  const router = useRouter();
  const location = params.get("location") || "";
  const start = params.get("start");
  const end = params.get("end");
  const types = params.getAll("type");
  const min = Number(params.get("minPrice") || 5000);
  const max = Number(params.get("maxPrice") || 500000);

  const adultCount = Number(params.get("adultCount") || 1);
  const childCount = Number(params.get("childCount") || 0);
  const roomCount = Number(params.get("roomCount") || 1);

  const startDate = start ? new Date(start) : undefined;
  const endDate = end ? new Date(end) : undefined;

  const [isHotelChecked, setIsHotelChecked] = useState(types.includes("hotel"));
  const [isApartmentChecked, setIsApartmentChecked] = useState(
    types.includes("apartment")
  );
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(500000);

  const updateFilters = (filters: {
    isHotelChecked: boolean;
    isApartmentChecked: boolean;
  }) => {
    const query = new URLSearchParams(params.toString());

    // Remove existing 'type' params
    query.delete("type");

    if (filters.isHotelChecked) query.append("type", "hotel");
    if (filters.isApartmentChecked) query.append("type", "apartment");

    setIsHotelChecked(filters.isHotelChecked);
    setIsApartmentChecked(filters.isApartmentChecked);

    router.push(`/hotelList?${query.toString()}`);
  };

  const {
    data: hotels,
    isLoading,
    isError,
  } = useHotels({
    location: location as string,
    startDate,
    endDate,
    propertyTypes: [
      ...(isHotelChecked ? ["hotel"] : []),
      ...(isApartmentChecked ? ["apartment"] : []),
    ],
    minPrice: min,
    maxPrice: max,
  });
  const [showFilterModal, setShowFilterModal] = useState(false);



  return (
    <div className="min-h-screen p-8 bg-gray-100 w-full">
      <div className="w-full flex flex-col gap-2">
        <h1 className="flex justify-center items-center my-4">
          Travel Hunters Hotel List Page
        </h1>
        <SearchForm
          defaultTab="hotels"
          initialLocation={location}
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialAdults={adultCount}
          initialChildren={childCount}
          initialRooms={roomCount}
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center my-5">
          Loading Suggestions...
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center my-5">Error ...</div>
      )}
      {/* Show filter button only on small screens */}
      <div className="md:hidden mt-6 mb-4 flex justify-start">
        <button
          onClick={() => setShowFilterModal(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md shadow cursor-pointer"
        >
          Filter
        </button>
      </div>

      {/* Filter Modal (Mobile Only) */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}
      <div className="my-5 mx-auto flex flex-col items-start justify-center md:grid md:grid-cols-[20vw_1fr] gap-4 w-full md:max-w-[800px]">
        {/* Show inline filter on large screens only */}
        <div className="hidden md:block">
          <FilterForm
            isHotelChecked={isHotelChecked}
            isApartmentChecked={isApartmentChecked}
            onChange={updateFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {!isLoading &&
            hotels?.length > 0 &&
            hotels.map((hotel: Hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          {!isLoading && hotels?.length === 0 && (
            <div className="flex justify-center items-center my-5">
              No hotels found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
