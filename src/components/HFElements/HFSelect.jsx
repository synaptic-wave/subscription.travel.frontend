import { Select } from '../FormElements/Select'
import { Controller } from 'react-hook-form'

export function HFSelect({
  name,
  control,
  placeholder,
  label,
  className,
  errors,
  options,
  disabled,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...props}
          name={name}
          placeholder={placeholder}
          label={label}
          className={className}
          error={error}
          options={options}
          disabled={disabled}
        />
      )}
    />
  )
}
