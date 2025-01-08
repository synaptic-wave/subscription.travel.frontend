import { MdOutlineAirlineSeatReclineExtra } from 'react-icons/md'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { IoMdCheckmark } from 'react-icons/io'
import classNames from 'classnames'
import { Button } from '@/components/index'

const items = [
  {
    label: '이코노미',
    value: '1'
  },
  {
    label: '비지니스',
    value: '2'
  },
  {
    label: '퍼스트',
    value: '3'
  }
]

export function SelectSeat({ value = items[0].value }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useOutsideClick(ref, () => {
    setOpen(false)
  })

  const label = items.find((item) => item.value === value).label

  return (
    <div className='flex flex-col gap-[11px] relative'>
      <label className='text-sm leading-[16px] text-[#374248] block'>
        좌석
      </label>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className='border border-[#B7C5C8] h-[55px] px-[10px] py-[15px] flex items-center justify-between'
      >
        <div className='flex items-center gap-[5px]'>
          <div className='min-w-[24px] flex'>
            <MdOutlineAirlineSeatReclineExtra color='#909090' fontSize='24px' />
          </div>
          <p className='text-base leading-[18px] text-[#374248]'>{label}</p>
        </div>
        <IoMdArrowDropdown fontSize='24px' />
      </div>
      {open && (
        <div
          ref={ref}
          style={{ boxShadow: '1px 4px 5px 0px #02020245' }}
          className='w-[500px] top-[100px] absolute left-0 px-[20px] pt-[20px] pb-[40px] rounded-[10px] bg-white flex items-center flex-col'
        >
          <div className='flex flex-col gap-[5px] mb-[23px] items-center'>
            <MdOutlineAirlineSeatReclineExtra color='#5A7BF0' fontSize='24px' />
            <p className='text-lg font-semibold'>좌석 선택</p>
          </div>
          <div className='grid grid-cols-3 w-full gap-[5px]'>
            {items.map((item) => (
              <button
                key={item.value}
                className={classNames(
                  'border relative text-center border-[#EAEAF4] py-[10px] text-base leading-[19px]',
                  value === item.value
                    ? 'border-[#5A7BF0] bg-[#EFF5FF] text-[#5A7BF0]'
                    : 'border-[#EAEAF4] text-[#A3A5B8]'
                )}
              >
                {item.label}
                <IoMdCheckmark
                  fontSize='20px'
                  className='absolute top-[10px] right-[8px]'
                  color={value === item.value ? '#DC231E' : '#A3A5B8'}
                />
              </button>
            ))}
          </div>
          <Button className='mt-[30px] w-[160px]'>확인</Button>
        </div>
      )}
    </div>
  )
}
