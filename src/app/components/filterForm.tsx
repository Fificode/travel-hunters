
import RangeSlider from "./RangeSlider";

const FilterForm = ({
  isHotelChecked,
  isApartmentChecked,
  onChange,
   minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  setHasAppliedPriceFilter
  
}: {
  isHotelChecked: boolean;
  isApartmentChecked: boolean;
  onChange: (filters: {
    isHotelChecked: boolean;
    isApartmentChecked: boolean;  
  }) => void;
   minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  setHasAppliedPriceFilter: (val: boolean) => void;
}) => {
 
 

  return (
    <div className="h-auto p-2 rounded-md mb-5 bg-[#303030] flex flex-col gap-2 ">
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-2">
        <h2>Popular filters</h2>
        <div className="flex justify-between flex-wrap items-center w-full">
          <div className="flex items-center gap-2 ">
            <input
              type="checkbox"
              className="w-4 h-4 border-2"
              checked={isHotelChecked}
             onChange={() =>
          onChange({
            isHotelChecked: !isHotelChecked,
            isApartmentChecked,
          })
        }
            />
            <label>Hotels</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 border-2"
              checked={isApartmentChecked}
             onChange={() =>
          onChange({
            isHotelChecked,
            isApartmentChecked: !isApartmentChecked,
          })
        }
            />
            <label>Apartments</label>
          </div>
        </div>
      </div>

      <RangeSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setHasAppliedPriceFilter={setHasAppliedPriceFilter}
      />
    </div>
  );
};

export default FilterForm;
