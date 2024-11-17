import classNames from 'classnames'
import { Oval } from 'react-loader-spinner'

export function Button({
  leftIcon,
  rightIcon,
  variant = 'default',
  className,
  children,
  disabled,
  isLoading = false,
  onClick,
  type = 'button',
  size = 'md',
  colorSchema = '',
  ...props
}) {
  const notDisabled = !isLoading && !disabled
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={classNames(
        'outline-none h-fit transition-all ease-in-out',
        size === 'lg' &&
          'p-[16px] text-[20px] text-base leading-[23px] font-medium',
        size === 'md' && 'py-[14px] px-[20px] font-[500] text-sm',
        size === 'sm' && 'py-[10px] px-[20px] text-sm',
        size === 'xs' &&
          'py-[8px] px-[16px] text-[13px] leading-[19px] font-[400]',
        (leftIcon || rightIcon) && 'flex items-center justify-center gap-[8px]',
        variant === 'secondary' && notDisabled && 'bg-[#A8ABBF] text-white',
        variant === 'default' &&
          notDisabled &&
          'bg-primary text-white hover:opacity-[0.8]',
        variant === 'unstyled' && notDisabled && 'text-[#06F] bg-transparent',
        variant === 'secondary-white' &&
          notDisabled &&
          'text-[#020202] bg-white hover:opacity-[0.7]',
        (disabled || isLoading) &&
          variant !== 'unstyled' &&
          'bg-[#EAEAF4] text-[#A3A5B8]',
        isLoading && 'flex items-center justify-center',
        className
      )}
      onClick={onClick}
      type={type}
    >
      {isLoading && (
        <Oval
          visible={true}
          height='20'
          width='20'
          ariaLabel='color-ring-loading'
          color={isLoading ? '#2D40FF' : '#fff'}
          strokeWidth={5}
          secondaryColor={isLoading ? '#9ca3af' : '#E7E7EE'}
        />
      )}
      {!isLoading && leftIcon}
      {!isLoading && children}
      {!isLoading && rightIcon}
    </button>
  )
}
