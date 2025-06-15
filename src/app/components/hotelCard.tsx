import Image from "next/image";
import { Hotel } from "../utils/types";
import { FaLocationDot } from "react-icons/fa6";

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const imageUrl = hotel.main_photo?.[0];
  const room = hotel.rooms?.[0];
  const amenities = room?.rooms_amenities?.slice(0, 3) || [];

  const totalRooms = room?.number_of_rooms || 0;
  const takenRooms = room?.number_of_room_taken || 0;
  const availableRooms = totalRooms - takenRooms;

  const nights = room?.late_night_date?.length || 0;

  return (
    <div className="w-full h-[250px] md:h-[200px] rounded-2xl bg-white shadow-md overflow-hidden flex">
      {/* Image */}
      <div className="w-[30%] h-[250px] md:h-[200px] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Main ${hotel.hotel_name}`}
            width={100} // adjust based on your layout
            height={200}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-2 md:p-4 flex flex-col gap-2 w-[40%]">
        <h2 className="text-[16px] font-semibold truncate max-w-[200px]">
          {hotel.hotel_name}
        </h2>
        <div className="flex gap-1">
          <FaLocationDot className=" text-black" />
          <p className="text-sm text-gray-500">
            {hotel.location_city}, {hotel.location_state},{" "}
            {hotel.location_country}
          </p>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {Array.from({ length: hotel.star_rating || 0 }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-black mt-2 max-w-[200px] max-h-[70px] truncate overflow-hidden">
            {amenities.map((a) => (
              <span
                key={a?.subItem}
                className="bg-gray-100 px-2 py-1 rounded-md"
              >
                {a?.subItem}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing / Actions */}
      <div className="px-4 pb-4 pt-2  bg-[#303030] flex flex-col items-center justify-center text-center gap-2 w-[30%] h-full">
        <p className="text-xs text-white ">
          {availableRooms} room(s) available, {nights} night(s)
        </p>
        {room && (
          <div className="flex flex-col gap-2 items-center">
            <div>
              <p className="text-lg font-bold text-yellow-500">
                ₦{room.rooms_rates_per_night.toLocaleString()}
              </p>
              {hotel.vat && (
                <p className="text-xs text-white">
                  This includes taxes and fees
                </p>
              )}
            </div>
            <button className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-700 transition">
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
