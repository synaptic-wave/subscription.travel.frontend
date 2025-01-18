import classNames from 'classnames'
import { forwardRef } from 'react'
import Skeleton from 'react-loading-skeleton'

export const Input = forwardRef(
  (
    {
      placeholder,
      label,
      className,
      inputClassName,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={classNames('flex flex-col gap-[6px]', className)}>
        <label className='text-[13px] text-[#5C5F79]'>{label}</label>
        {isLoading ? (
          <Skeleton width='100%' height={48} />
        ) : (
          <input
            ref={ref}
            {...props}
            className={classNames(
              'py-[13px] px-4 text-sm placeholder:text-sm border border-gray-100 border-solid focus:border-primary-600',
              inputClassName
            )}
            placeholder={placeholder}
          />
        )}
      </div>
    )
  }
)
