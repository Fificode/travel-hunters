'use client'
import SearchForm from "@/app/components/searchForm";
import { useSearchParams } from "next/navigation"

const HotelList = () => {
   const params = useSearchParams();
  const location = params.get("location");
  const start = params.get("start");
  const end = params.get("end");
  const adults = params.get("adults");
  const children = params.get("children");
  const rooms = params.get("rooms");
  return (
    <div className="min-h-screen p-8 bg-white">
      <SearchForm/>
      <div className="max-w-5xl mx-auto my-4">
    <h1>Hotels in {location}</h1>
      <p>From: {start}</p>
      <p>To: {end}</p>
      <p>Guests: {adults} Adults, {children} Children</p>
      <p>Rooms: {rooms}</p>
      </div>
      </div>
  )
}

export default HotelList