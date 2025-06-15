"use client";
import { useState, useMemo } from "react";
import SearchForm from "@/app/components/searchForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useHotels } from "@/app/hooks/useHotels";
import { Hotel } from "@/app/utils/types";
import FilterForm from "@/app/components/filterForm";
import HotelCard from "@/app/components/hotelCard";
import FilterModal from "./FilterModal";
import LoadMoreTrigger from "./LoadMoreTrigger";
import { FaSpinner } from "react-icons/fa6";

const HotelList = () => {
  const params = useSearchParams();
  const router = useRouter();
  const location = params.get("ss") || "";
  const start = params.get("startDate");
  const end = params.get("endDate");

  const adultCount = Number(params.get("adultCount") || 1);
  const childCount = Number(params.get("childCount") || 0);
  const roomCount = Number(params.get("roomCount") || 1);

  const startDate = useMemo(() => {
    return start ? new Date(start) : undefined;
  }, [start]);

  const endDate = useMemo(() => {
    return end ? new Date(end) : undefined;
  }, [end]);

  const initialHotelChecked = params.get("pt") === "hotel";
  const initialApartmentChecked = params.get("bt") === "apartments";
  const [isHotelChecked, setIsHotelChecked] = useState(initialHotelChecked);
  const [isApartmentChecked, setIsApartmentChecked] = useState(
    initialApartmentChecked
  );

  const initialMinPrice = Number(params.get("minPrice") || 5000);
  const initialMaxPrice = Number(params.get("maxPrice") || 500000);

  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [hasAppliedPriceFilter, setHasAppliedPriceFilter] = useState(false);

  const filters = useMemo(
    () => ({
      ss: location,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      roomCount,
      adultCount,
      childCount,
      pt: isHotelChecked ? "hotel" : "",
      bt: isApartmentChecked ? "apartments" : "",
     ...(hasAppliedPriceFilter && {
    min_price: minPrice,
    max_price: maxPrice,
  }),
    }),
    [
      location,
      startDate,
      endDate,
      roomCount,
      adultCount,
      childCount,
      isHotelChecked,
      isApartmentChecked,
      minPrice,
      maxPrice,
      hasAppliedPriceFilter
    ]
  );

  const updateFilters = ({
    isHotelChecked,
    isApartmentChecked,
  }: {
    isHotelChecked: boolean;
    isApartmentChecked: boolean;
  }) => {
    setIsHotelChecked(isHotelChecked);
    setIsApartmentChecked(isApartmentChecked);

    const searchParams = new URLSearchParams(params.toString());

    // Set or delete based on the boolean
    if (isHotelChecked) {
      searchParams.set("pt", "hotel");
    } else {
      searchParams.delete("pt");
    }

    if (isApartmentChecked) {
      searchParams.set("bt", "apartments");
    } else {
      searchParams.delete("bt");
    }

    router.push(`?${searchParams.toString()}`);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHotels(filters);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const hotels = data?.pages?.flatMap((page) => page.hotels) || [];
const totalCount = data?.pages?.[0]?.count || 0;

  return (
    <div className="min-h-screen p-8 w-full">
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
      {isLoading && (
        <div className="flex justify-center items-center my-5">
          Loading Suggestions...
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center my-5">Error ...</div>
      )}
      {!isLoading && (
  <h2 className="text-xl font-semibold">
    {totalCount} Properties found{location ? ` in ${location}` : ""}
  </h2>
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
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          isHotelChecked={isHotelChecked}
          isApartmentChecked={isApartmentChecked}
          onChange={updateFilters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          setHasAppliedPriceFilter={setHasAppliedPriceFilter}
        />
      )}
      <div className="my-5 mx-auto flex flex-col items-start justify-center md:grid md:grid-cols-[20vw_1fr] gap-4 w-full md:max-w-5xl">
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
            setHasAppliedPriceFilter={setHasAppliedPriceFilter}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          {!isLoading &&
            hotels?.length > 0 &&
            hotels.map((hotel: Hotel, index) => (
              <HotelCard key={`${hotel.id}-${index}`} hotel={hotel} />
            ))}
          {!isLoading && hotels?.length === 0 && (
            <div className="flex justify-center items-center my-5">
              No hotels found.
            </div>
          )}
          {hasNextPage && <LoadMoreTrigger onLoadMore={fetchNextPage} />}

          {/* Optional: loading spinner for next page */}
          {isFetchingNextPage && (
            <div className="text-center py-4 flex justify-center items-center">
              <FaSpinner className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
