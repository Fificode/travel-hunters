import RangeSlider from "./RangeSlider";

const FilterForm = () => {
  return (
    <div className="h-auto p-2 rounded-md mb-5 bg-[#303030] flex flex-col gap-2 ">
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow flex flex-col gap-2">
        <h2>Popular filters</h2>
        <div className="flex justify-between flex-wrap items-center w-full">
          <div className="flex items-center gap-2 ">
            <input type="checkbox" className="w-4 h-4 border-2" />
            <label>Hotels</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 border-2" />
            <label>Apartments</label>
          </div>
        </div>
      </div>

      <RangeSlider />
    </div>
  );
};

export default FilterForm;
