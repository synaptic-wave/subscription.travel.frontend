import image2 from '@/assets/images/hero/hero2.jpg'
import image1 from '@/assets/images/hero/hero1.jpg'
import image1Mobile from '@/assets/images/hero/hero1-mobile.jpg'
import image2Mobile from '@/assets/images/hero/hero2-mobile.jpg'
import Slider from 'react-slick'
import { useGetBanners } from '@/services/target.service'
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'

var settings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 6000
}

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1
  }
}
export function Banner() {
  const { data, isLoading } = useGetBanners({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: 'order:asc'
    }
  })

  return (
    <div className='sm:mt-[50px] sm:mb-[80px] mt-[20px] mb-[42px]'>
      {isLoading && <Skeleton className='sm:h-[320px] w-full h-[140px]' />}
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
      )}
    </div>
  )
}
