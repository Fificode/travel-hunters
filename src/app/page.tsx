"use client";
import SearchForm from "./components/searchForm";

export default function Home() {
  // const location = " ";
  // const startDate = "";
  // const endDate = ""; // 1 day after start
  // const adults = 2;
  // const children = 0;
  // const rooms = 1;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <SearchForm  defaultTab="hotels"
        // initialLocation={location}
        // initialStartDate={startDate}
        // initialEndDate={endDate}
        // initialAdults={adults}
        // initialChildren={children}
        // initialRooms={rooms}
         />
    </div>
  );
}
