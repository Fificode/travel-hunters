'use client'
import SearchForm from "@/app/components/searchForm";
import { useSearchParams } from "next/navigation"
import { useHotels } from "@/app/hooks/useHotels";
import { Hotel} from "@/app/utils/types";
import FilterForm from "@/app/components/filterForm";
import HotelCard from "@/app/components/hotelCard";

const HotelList = () => {
     const params = useSearchParams();
  const location = params.get("location") || "";
  const start = params.get("start");
  const end = params.get("end");
 const adultCount = Number(params.get("adultCount") || 1);
const childCount = Number(params.get("childCount") || 0);
const roomCount = Number(params.get("roomCount") || 1);

const startDate = start ? new Date(start) : undefined;
const endDate = end ? new Date(end) : undefined;

  const { data: hotels, isLoading, isError } = useHotels({
    location: location as string,
   startDate,
  endDate,
  });

  return (
        <div className="min-h-screen p-8 bg-white w-full">
      <div className="w-full flex flex-col gap-2">
      <h1 className="flex justify-center items-center my-4">Travel Hunters Hotel list Page</h1>
      <SearchForm 
      defaultTab="hotels"
        initialLocation={location}
        initialStartDate={startDate}
        initialEndDate={endDate}
        initialAdults={adultCount}
        initialChildren={childCount}
        initialRooms={roomCount}/>
        </div>
      {isLoading &&  (
<div className="flex justify-center items-center my-5">Loading hotels...</div>
      )}
      {isError && (
<div className="flex justify-center items-center my-5">Error Loading hotels...</div>
      )}
      <div className="my-5 grid grid-cols-2 justify-center mx-auto border border-red-500">
        <FilterForm/>
        <div className="flex flex-col w-[70%] border border-red-500">
       {!isLoading && hotels?.length > 0 && (
  hotels.map((hotel: Hotel) => (
    <HotelCard key={hotel.id} />
    // <div key={hotel.id} className="mb-4 p-4 border rounded shadow">
    //   <h2 className="text-lg font-semibold">{hotel.hotel_name}</h2>
    //   <p className="text-sm text-gray-600">{hotel.location_city}</p>

    //   {hotel.rooms?.length ? (
    //     hotel.rooms.map((room) => {
    //       const total = room.number_of_rooms ?? 0;
    //       const taken = room.number_of_room_taken ?? 0;
    //       const available = total - taken;

    //       return (
    //         <div key={room.id} className="pl-4 mt-2 border-l border-gray-300">
    //           <p>Room Capacity: {room.rooms_capacity}</p>
    //           <p>Total Rooms: {total}</p>
    //           <p>Rooms Taken: {taken}</p>
    //           <p className="font-semibold text-green-600">
    //             Rooms Available: {available > 0 ? available : 0}
    //           </p>
    //           <p>Rate per Night: ₦{room.rooms_rates_per_night.toLocaleString()}</p>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <p className="text-red-500">No rooms available</p>
    //   )}
    // </div>
  ))
)}
</div>
        {!isLoading && hotels?.length === 0 && <div className="flex justify-center items-center my-5">No hotels found.</div>}
      
     </div>
      </div>
  )
}

export default HotelList