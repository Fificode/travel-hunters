// import {
//     Box,
//     RangeSlider,
//     RangeSliderTrack,
//     RangeSliderFilledTrack,
//     RangeSliderThumb,
// } from '@chakra-ui/react'

const FilterForm = () => {
  return (
    <div>
         <div className='w-full flex items-center justify-around mb-5'>
                <label htmlFor='sliderMin' className='bg-[#cae9fca8] text-black text-xs font-semibold rounded-sm w-9 h-9 flex justify-center items-center pb-0'>0</label>
                <div className='w-[60%]'>
                    {/* <RangeSlider aria-label={['min', 'max']} defaultValue={[30, 80]}>
                        <RangeSliderTrack>
                            <RangeSliderFilledTrack bg='blue.700' />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={3} index={0}>
                            <Box />
                        </RangeSliderThumb>
                        <RangeSliderThumb boxSize={3} index={1}>
                            <Box />
                        </RangeSliderThumb>
                    </RangeSlider> */}
                </div>
                <label htmlFor='sliderMax' className='bg-[#cae9fca8] text-black text-xs font-semibold rounded-sm w-9 h-9 flex justify-center items-center pb-0'>3500</label>
            </div>
    </div>
  )
}

export default FilterForm