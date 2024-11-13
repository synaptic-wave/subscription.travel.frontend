import { useState } from 'react'
import ChevronIcon from '@/assets/icons/chevron-up.svg?react'

export function Accordion({ title, children }) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <span className='text-sm sm:text-[16px] text-[#161A3F]'>{title}</span>
        <button onClick={() => setCollapsed((prev) => !prev)}>
          <ChevronIcon
            className='cursor-pointer'
            style={{
              transform: collapsed && 'rotateZ(180deg)'
            }}
          />
        </button>
      </div>

      {collapsed && <div className='w-full'>{children}</div>}
    </div>
  )
}
