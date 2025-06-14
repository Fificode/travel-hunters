
import HotelList from "@/app/components/hotelList";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-4">Loading search parameters...</div>}>
    <HotelList/>
    </Suspense>
  );
}
