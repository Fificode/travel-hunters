import { Hotel } from "../utils/types"

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="w-full rounded-[20px] h-[280px] flex shadow-md">
        <div>{hotel.hotel_name}</div>
        <div className="flex flex-col p-2 items-start">

        </div>
        <div></div>
    </div>
  )
}

export default HotelCard