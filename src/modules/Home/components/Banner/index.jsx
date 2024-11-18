export function Banner({ img, content }) {
  return (
    <div className='h-[305px] relative mt-[28px]'>
      <img src={img} className='w-full h-full object-cover rounded-[8px]' />
      <div className='flex flex-col absolute top-[60px] left-[60px]'>
        {content}
      </div>
      {/* {isLoading && <Skeleton className='sm:h-[320px] w-full h-[140px]' />}
      {!isLoading && (
        <Slider {...settings} className='hidden sm:block'>
          {data?.results?.map((item) => (
            <motion.div
              initial='hidden'
              animate='visible'
              variants={container}
              transition={{
                duration: 0.8
              }}
              key={item.id}
              className='sm:h-[320px] w-full h-[140px] rounded-[10px] overflow-hidden relative'
            >
              <img
                src={item.imageURL.browser}
                className='w-full h-full object-cover'
              />
              {item?.link_button?.is_active && (
                <a
                  href={
                    item.link_button.url === '#'
                      ? `/banner/${item.id}`
                      : item.link_button.url
                  }
                  target='_blank'
                  className='absolute right-[70px] bottom-[38px] py-[14px] px-[18px] rounded-[5px] bg-white text-sm'
                >
                  {item.link_button.kr}
                </a>
              )}
            </motion.div>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <Slider {...settings} className='sm:hidden block'>
          {data?.results?.map((item) => (
            <motion.div
              initial='hidden'
              animate='visible'
              variants={container}
              transition={{
                duration: 0.8
              }}
              key={item.id}
              className='sm:h-[320px] w-full h-[140px] rounded-[10px] overflow-hidden relative'
            >
              <img
                src={item.imageURL.mobile}
                className='w-full h-full object-cover'
              />
              {item?.link_button?.is_active && (
                <a
                  href={
                    item.link_button.url === '#'
                      ? `/banner/${item.id}`
                      : item.link_button.url
                  }
                  target='_blank'
                  className='absolute right-[12px] bottom-[16px] py-[8px] px-[11px] rounded-[5px] bg-white text-xs'
                >
                  {item.link_button.kr}
                </a>
              )}
            </motion.div>
          ))}
        </Slider>
      )} */}
    </div>
  )
}
