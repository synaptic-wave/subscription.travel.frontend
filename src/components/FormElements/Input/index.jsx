import classNames from 'classnames'
import { forwardRef } from 'react'
import Skeleton from 'react-loading-skeleton'

export const Input = forwardRef(
  ({ placeholder, label, className, isLoading = false, ...props }, ref) => {
    return (
      <div className={classNames('flex flex-col gap-[6px]', className)}>
        <label className='text-[13px] text-[#5C5F79]'>{label}</label>
        {isLoading ? (
          <Skeleton width='100%' height={48} />
        ) : (
          <input
            ref={ref}
            {...props}
            className='py-[13px] px-4 text-sm placeholder:text-sm rounded-[10px] border border-gray-100 border-solid focus:border-primary-600'
            placeholder={placeholder}
          />
        )}
      </div>
    )
  }
)
