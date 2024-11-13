import ReactSelect from 'react-select'
import { useRef } from 'react'
import classNames from 'classnames'

export function Select({
  className = '',
  name,
  required = false,
  onChange,
  value,
  components,
  placeholder,
  leftIcon,
  fullWidth = false,
  errors,
  onFocus,
  label,
  containerProps = {},
  ...restProps
}) {
  const ref = useRef()
  return (
    <div className={className}>
      {!!label && (
        <label className='block text-sm leading-[16px] mb-[11px]'>
          {label}
        </label>
      )}
      <div
        onClick={onFocus}
        className={classNames(
          !containerProps?.className
            ? 'relative transition-all ease-in-out rounded-[10px] w-full outline outline-1 outline-gray-100 hover:outline-primary-600'
            : containerProps?.className
        )}
      >
        {!!leftIcon && (
          <span
            onClick={onFocus}
            className='absolute left-[12px] top-[14px] z-10'
          >
            {leftIcon}
          </span>
        )}
        <ReactSelect
          {...restProps}
          ref={ref}
          required={required}
          loadingMessage={() => '불러오는중...'}
          name={name}
          inputId='input-select'
          onChange={(selectedOption, triggeredAction) => {
            if (triggeredAction.action === 'clear') {
              ref.current.blur()
              ref.current.focus()
            }
            onChange(selectedOption)
          }}
          placeholder={placeholder}
          components={{
            IndicatorSeparator: () => null,
            ...components
          }}
          value={value}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              width: '100%',
              borderRadius: '10px',
              ...restProps.styles?.container
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: 'none',
              boxShadow: 'none',
              minHeight: '24px',
              width: '100%',
              borderRadius: '10px',
              ...restProps.styles?.control
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: leftIcon ? '14px 12px 14px 35px' : '14px 12px 14px 12px',
              ...restProps.styles?.valueContainer
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: '#A3A5B8',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '400',
              margin: 0,
              opacity: 1,
              ...restProps.styles?.placeholder
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
              minWidth: window.innerWidth > 600 ? 450 : 'auto',
              ...restProps.styles?.menu
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
              fontSize: '14px',
              lineHeight: '20px',
              ...restProps.styles?.input
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
              ...restProps.styles?.menuList
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              fontWeight: 400,
              color: '#000',
              fontSize: '14px',
              lineHeight: '20px',
              ...restProps.styles?.singleValue
            }),
            indicatorsContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: '0!important',
              ...restProps.styles?.indicatorsContainer
            })
          }}
        />
      </div>
      {errors && errors[name] && errors[name].type === 'required' && (
        <span className='text-xs mt-[5px] text-[#ff0000] block'>
          필수 입력란입니다!
        </span>
      )}
    </div>
  )
}
