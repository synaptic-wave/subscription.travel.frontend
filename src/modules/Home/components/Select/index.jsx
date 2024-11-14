import ReactSelect, { components } from 'react-select'
import { useRef } from 'react'
import classNames from 'classnames'
import { HiLocationMarker } from 'react-icons/hi'

const ControlWithIcon = (props) => {
  return (
    <components.Control {...props}>
      {!!props.leftIcon && props.leftIcon}
      {props.children}
    </components.Control>
  )
}

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
          Control: (props) => (
            <ControlWithIcon {...props} leftIcon={leftIcon} />
          ),
          ...components
        }}
        value={value}
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            width: '100%',
            border: state.isFocused ? '1px solid #5A7BF0' : '1px solid #B7C5C8'
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: 'none',
            boxShadow: 'none',
            minHeight: '53px',
            maxHeight: '53px',
            width: '100%',
            padding: '15px'
          }),
          valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            marginLeft: '5px',
            padding: 0
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: '#A3A5B8',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '400',
            margin: 0,
            width: '100%',
            opacity: 1,
            whiteSpace: 'nowrap'
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

      {errors && errors[name] && errors[name].type === 'required' && (
        <span className='text-xs mt-[5px] text-[#ff0000] block'>
          필수 입력란입니다!
        </span>
      )}
    </div>
  )
}
