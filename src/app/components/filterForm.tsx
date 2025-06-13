// import { Slider } from "@chakra-ui/react";

const FilterForm = () => {
  return (
    <div>
      <div className="w-[30%] h-[300px] flex items-center justify-around mb-5 border border-red-400">
        <label
          htmlFor="sliderMin"
          className="bg-[#cae9fca8] text-black text-xs font-semibold rounded-sm w-9 h-9 flex justify-center items-center pb-0"
        >
          0
        </label>
        <div className="">
          {/* <Slider.Root width="200px" defaultValue={[30, 60]}>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root> */}
        </div>
        <label
          htmlFor="sliderMax"
          className="bg-[#cae9fca8] text-black text-xs font-semibold rounded-sm w-9 h-9 flex justify-center items-center pb-0"
        >
          3500
        </label>
      </div>
    </div>
  );
};

export default FilterForm;
