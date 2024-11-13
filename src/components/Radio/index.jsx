export function Radio({
  id,
  name,
  value,
  onChange,
  checked,
  label,
  colorClass = ''
}) {
  return (
    <label
      htmlFor={id}
      className='text-[#303030] text-[14px] font-normal mr-[7px] cursor-pointer flex items-center'
      style={{
        '-webkit-tap-highlight-color': 'transparent'
      }}
    >
      <div>
        <input
          className={`radioInput ${colorClass}`}
          type='radio'
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span className={`customRadio ${colorClass}`} />
      </div>
      <p className='text-[#161a3f] text-[13px] pt-[7px]'>{label}</p>
    </label>
  )
}
