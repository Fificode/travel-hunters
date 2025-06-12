'use client'
import SearchForm from "@/app/components/searchForm";
import { useSearchParams } from "next/navigation"
import { useHotels } from "@/app/hooks/useHotels";

const HotelList = () => {
  const params = useSearchParams();
  const location = params.get("location") || "";
  const start = params.get("start");
  const end = params.get("end");
  const adults = parseInt(params.get("adults") || "1", 10);
  const children = parseInt(params.get("children") || "0", 10);
  const rooms = parseInt(params.get("rooms") || "1", 10);

const startDate = start ? new Date(start) : undefined;
const endDate = end ? new Date(end) : undefined;

  const { data: hotels, isLoading, isError } = useHotels({
    location: location as string,
   startDate,
  endDate,
  });

 

  return (
    <div className="min-h-screen p-8 bg-white">
      <SearchForm 
      defaultTab="hotels"
        initialLocation={location}
        initialStartDate={startDate}
        initialEndDate={endDate}
        initialAdults={adults}
        initialChildren={children}
        initialRooms={rooms}/>
      {isLoading && (
<div className="flex justify-center items-center my-5">Loading hotels...</div>
      )}
      {isError && (
<div className="flex justify-center items-center my-5">Error Loading hotels...</div>
      )}
      <div className="my-5">
       {!isLoading && hotels?.length ? (
        hotels.map((hotel) => (
          <div key={hotel.id} className="mb-4 p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{hotel.name}</h2>
            <p>{hotel.location_city}</p>
            {/* more hotel info here */}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center my-5">No hotels found.</div>
      )}
     </div>
      </div>
  )
}

export default HotelList