import { Input } from '..'
import { Controller } from 'react-hook-form'

export function HFInput({
  name,
  control,
  placeholder,
  label,
  className,
  type,
  isLoading,
  rules,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Input
            {...field}
            {...props}
            name={name}
            placeholder={placeholder}
            label={label}
            className={className}
            type={type}
            isLoading={isLoading}
          />
          <p className='text-xs text-[#ff0000]'>{error?.message}</p>
        </div>
      )}
    />
  )
}
