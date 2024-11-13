import ChevronRightIcon from '@/assets/icons/chevron-right.svg?react'
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg?react'
import classNames from 'classnames'

export function SliderNextArrow(props) {
  const { className, arrowClassName = '', onClick } = props
  return (
    <div
      className={classNames(
        className,
        `react-slick-arrows flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[32px] h-[32px] rounded-full bg-white z-[9] ${arrowClassName}`
      )}
      style={{ boxShadow: '0px 0px 10px 0px #5E66A740' }}
      onClick={onClick}
    >
      <ChevronRightIcon />
    </div>
  )
}

export function SliderPrevArrow(props) {
  const { className, arrowClassName = '', onClick } = props
  return (
    <div
      className={classNames(
        className,
        `react-slick-arrows flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[32px] h-[32px] rounded-full bg-white z-[9] ${arrowClassName}`
      )}
      style={{ boxShadow: '0px 0px 10px 0px #5E66A740' }}
      onClick={onClick}
    >
      <ChevronLeftIcon />
    </div>
  )
}
