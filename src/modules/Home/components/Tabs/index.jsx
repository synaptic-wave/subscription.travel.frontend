import classNames from 'classnames'

export function Tabs({ items, value, onChange }) {
  return (
    <div className='w-full flex flex-row flex-wrap items-center justify-center gap-[10px] no-scrollbar sm:mt-0 mt-[15px]'>
      {items?.map((item) => (
        <button
          className={classNames(
            'sm:text-base scale-box font-bold text-[13px] border border-[#FF3838] text-[#FF3838] border-solid py-[8px] px-[20px] rounded-[100px] break-keep whitespace-nowrap',
            value.id === item.id && 'bg-[#FF3838] text-white'
          )}
          onClick={() => onChange(item)}
          key={item.id}
        >
          {item.location}
        </button>
      ))}
    </div>
  )
}
