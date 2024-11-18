import { SearchFormV2 } from '../SearchFromV2'

export const TripBoard = ({ setIsOpenNotFound, setIsOpenSearchHotel }) => {
  return (
    <>
      <SearchFormV2
        setIsOpenNotFound={setIsOpenNotFound}
        setIsOpenSearchHotel={setIsOpenSearchHotel}
      />

      {/* {!isLoading && data?.results?.length > 0 && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={container}
            transition={{
              duration: 0.8
            }}
            className='w-full flex gap-3 mt-[26px] flex-wrap justify-between'
          >
            {data?.results?.map((item, index) => (
              <motion.div variants={animation}>
                <div
                  className='sm:h-[266px] scale-image sm:w-[266px] h-[150px] w-[150px] rounded-full flex items-end justify-center p-4 relative cursor-pointer'
                  key={index}
                  onClick={() => onNavigateToSearchResult(item)}
                  style={{
                    backgroundImage: `url(${item.imageURL})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                  }}
                >
                  <span className='sm:px-7 sm:py-4 px-[14px] py-[9px] bg-[rgba(255,255,255,0.7)] rounded-full text-[15px]'>
                    {item.kr_location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {isLoading && (
          <div className='w-full flex gap-3 mt-[26px] flex-wrap justify-between'>
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
          </div>
        )} */}
    </>
  )
}
