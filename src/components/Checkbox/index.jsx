import classNames from 'classnames'

export function Checkbox({
  label,
  isChecked,
  onChange,
  value,
  labelClassname,
  ...props
}) {
  return (
    <label
      htmlFor={props?.inputId}
      {...props}
      className={classNames('checkbox', props.className)}
    >
      <input
        type='checkbox'
        checked={isChecked}
        id={props?.inputId}
        onChange={() => onChange(!isChecked)}
      />
      <span className='checkbox-faker'></span>
      <span className={labelClassname}>{label}</span>
    </label>
  )
}
