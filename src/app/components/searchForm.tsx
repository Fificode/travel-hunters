"use client"
import { useRouter } from "next/navigation";
import {  useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaLocationDot } from "react-icons/fa6";
import { RiCalendarCheckFill } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";

interface SearchFormProps {
  defaultTab?: "hotels" | "tours";
  initialLocation?: string;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialAdults?: number;
  initialChildren?: number;
  initialRooms?: number;
}

type GuestRowProps = {
  label: string;
  subLabel?: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const GuestRow = ({
  label,
  subLabel,
  count,
  onIncrement,
  onDecrement,
}: GuestRowProps) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium">{label}</div>
      {subLabel && <div className="text-xs text-gray-500">{subLabel}</div>}
    </div>
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={onDecrement}
        className="w-6 h-6 rounded-[5px] bg-gray-100 text-center text-sm"
      >
        -
      </button>
      <span className="w-6 text-center">{count}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="w-6 h-6 rounded-[5px] bg-gray-100 text-center text-sm"
      >
        +
      </button>
    </div>
  </div>
);

const SearchForm = ({
  defaultTab = "hotels",
  initialLocation = "",
  initialStartDate = null,
  initialEndDate = null,
  initialAdults = 1,
  initialChildren = 0,
  initialRooms = 1,
}: SearchFormProps) => {
  const router = useRouter();
  const places = ["Lagos", "Abuja", "Kano", "Ibadan"];
  const [selectedTab, setSelectedTab] = useState<"hotels" | "tours">(defaultTab);
   const [location, setLocation] = useState(initialLocation);
  const [filteredPlaces, setFilteredPlaces] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
   const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
   const [adultCount, setAdultCount] = useState(initialAdults);
const [childCount, setChildCount] = useState(initialChildren);
const [roomCount, setRoomCount] = useState(initialRooms);

  
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    const filtered = places.filter((place) =>
      place.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlaces(filtered);
    setShowLocationDropdown(value.length > 0 && filtered.length > 0);
  };

  const handleSelect = (place: string) => {
    setLocation(place);
    setShowLocationDropdown(false);
  };


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location.trim()) {
      alert("Please select a location before searching.");
      return;
    }

     const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

    // Option 1: Pass search data via query params
    const queryParams = new URLSearchParams({
      location,
       start: formatDate(startDate),
    end: formatDate(endDate),
      adultCount: adultCount.toString(),
  childCount: childCount.toString(),
  roomCount: roomCount.toString(),
    });

    router.push(`/hotelList?${queryParams.toString()}`);
  };

  return (
    <form
        onSubmit={handleSearch}
        className="bg-white  rounded-[20px] shadow-md max-w-5xl mx-auto"
      >
        {/* Tabs */}
        <div className="flex justify-center items-center gap-4 border-b pt-2 border-gray-500">
          <button
            type="button"
            className={`px-4 py-2 font-medium cursor-pointer ${
              selectedTab === "hotels"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-800"
            }`}
            onClick={() => setSelectedTab("hotels")}
          >
            Hotels
          </button>
          <button
            type="button"
            className={`px-4 py-2 cursor-pointer  font-medium ${
              selectedTab === "tours"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-800"
            }`}
            onClick={() => setSelectedTab("tours")}
          >
            Tour Packages
          </button>
        </div>
        <div className="w-full py-2 px-2">
          {/* Search Fields */}
          <h1 className="text-2xl font-bold mb-2">
            {selectedTab === "hotels"
              ? "Search Hotels"
              : "Search Tour Packages"}
          </h1>

          <div className="flex flex-col md:flex-row md:justify-center md:items-center items-start gap-4 flex-wrap">
            {/* Location Input */}
            <div className="relative w-full md:w-[30%] flex flex-1">
              {/* Location icon */}
              <FaLocationDot className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />

              {/* Label inside the location input */}
              <label className="absolute left-10 top-[3px] text-[12px] leading-[16px] text-black pointer-events-none">
                Where are you going?
              </label>

              {/* Location input field */}
              <input
                type="search"
                className="w-full pl-10 pt-5 pr-4 pb-1 border border-gray-300 rounded-md text-[14px] text-gray-900 bg-transparent outline-primary"
                value={location}
                onChange={handleInputChange}
                onFocus={() => {
                  if (location && filteredPlaces.length > 0)
                    setShowLocationDropdown(true);
                }}
                placeholder="Name or Destination"
              />
              {/*Location  Dropdown */}
              {showLocationDropdown && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10">
                  {filteredPlaces.map((place) => (
                    <li
                      key={place}
                      onClick={() => handleSelect(place)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Date Pickers */}

            <div className="w-full md:w-[30%] relative">
              {/* Calendar icon */}
              <RiCalendarCheckFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              {/* Label inside the date input */}
              <label className="absolute left-10 top-[3px] text-[12px] leading-[16px] text-black pointer-events-none">
                Dates
              </label>

              <DatePicker
                selected={startDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange
                placeholderText="Select date range"
                className="w-full pl-10 pt-5 pr-4 pb-1 border text-[14px] border-gray-300 rounded-md outline-primary "
                wrapperClassName={"custom-datepicker-wrapper"}
              />
            </div>

            {/* Room Selector */}
            <div className="relative w-full flex flex-1">
              {/* room icon */}
              <RiUserLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
              {/* Label inside the room input */}
              <label className="absolute left-10 top-[4px] text-[12px] leading-[16px] text-black pointer-events-none">
                How many rooms?
              </label>
              <div
                className="w-full pl-10 pt-5 pr-4 pb-2 border text-[14px] border-gray-300 rounded-md outline-primary cursor-pointer"
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              >
                {`${adultCount} Adult${adultCount > 1 ? "s" : ""}, ${childCount} Child${
                  childCount !== 1 ? "ren" : ""
                }, ${roomCount} Room${roomCount > 1 ? "s" : ""}`}
              </div>
              {/* Room selector dropdown */}
              {showGuestDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg rounded-md z-10 p-4 space-y-4">
                  {/* Adults */}
                  <GuestRow
                    label="Adults"
                    subLabel="> 12 years"
                    count={adultCount}
                    onDecrement={() => setAdultCount(Math.max(1, adultCount - 1))}
                    onIncrement={() => setAdultCount(adultCount + 1)}
                  />

                  {/* Children */}
                  <GuestRow
                    label="Children"
                    subLabel="2–12 years"
                    count={childCount}
                    onDecrement={() => setChildCount(Math.max(0, childCount - 1))}
                    onIncrement={() => setChildCount(childCount + 1)}
                  />

                  {/* Rooms */}
                  <GuestRow
                    label="Rooms"
                    count={roomCount}
                    onDecrement={() => setRoomCount(Math.max(1, roomCount - 1))}
                    onIncrement={() => setRoomCount(roomCount + 1)}
                  />

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setShowGuestDropdown(false)}
                      className="bg-primary text-white px-4 py-1 rounded"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 font-[500] text-[18px] rounded-md transition bg-primary text-white cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    
  )
}

export default SearchForm