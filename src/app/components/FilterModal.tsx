'use client'
import FilterForm from "./filterForm";

const FilterModal = ({
  isHotelChecked,
  isApartmentChecked,
  onChange,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  onClose,
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
  onClose: () => void 
}) => {
  return (
    <div  onClick={onClose} >
      <div className="fixed inset-0 z-40 bg-black/40  flex justify-center items-center">
        <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Filter</div>
            <button onClick={onClose} className="text-black font-[500] text-3xl">&times;</button>
          </div>
          <FilterForm
           isHotelChecked={isHotelChecked}
            isApartmentChecked={isApartmentChecked}
            onChange={onChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            setHasAppliedPriceFilter={setHasAppliedPriceFilter} />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
