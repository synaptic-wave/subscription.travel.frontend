import { IoMdArrowDropdown } from 'react-icons/io'
import { useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { Button } from '@/components/index'
import { FaUser } from 'react-icons/fa6'
import { Counter } from './Counter'

const items = [
  {
    label: '성인',
    value: 'adult'
  },
  {
    label: '소아',
    value: 'children'
  },
  {
    label: '유아',
    value: 'infant'
  }
]

export function SelectPassenger({}) {
  const [open, setOpen] = useState(false)

  const [state, setState] = useState({
    adult: 1,
    children: 0,
    infant: 0
  })

  const ref = useRef()

  useOutsideClick(ref, () => {
    setOpen(false)
  })

  const onIncrement = (key) => {
    setState((prev) => ({
      ...prev,
      [key]: prev[key] + 1
    }))
  }

  const onDecrement = (key) => {
    if (key === 'adult' && state[key] > 1) {
      setState((prev) => ({
        ...prev,
        [key]: prev[key] - 1
      }))
    }
    if (key !== 'adult' && state[key] > 0) {
      setState((prev) => ({
        ...prev,
        [key]: prev[key] - 1
      }))
    }
  }

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
          <div className='min-w-[16px] flex'>
            <FaUser color='#909090' fontSize='16px' />
          </div>
          <p className='text-base leading-[18px] text-[#374248]'>성인 1명</p>
        </div>
        <IoMdArrowDropdown fontSize='24px' />
      </div>
      {open && (
        <div
          ref={ref}
          style={{ boxShadow: '1px 4px 5px 0px #02020245' }}
          className='w-[500px] top-[100px] absolute left-[-100px] px-[20px] pt-[20px] pb-[40px] rounded-[10px] bg-white flex items-center flex-col'
        >
          <div className='flex flex-col gap-[5px] mb-[23px] items-center'>
            <FaUser color='#5A7BF0' fontSize='18px' />
            <p className='text-lg font-semibold'>승객 선택</p>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            {items.map((item) => (
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='text-base leading-[21px]'>{item.label}</p>
                  <p className='text-[#A3A5B8] text-[11px]'>(만 12세 이상)</p>
                </div>
                <Counter
                  onIncrement={() => onIncrement(item.value)}
                  value={state[item.value]}
                  onDecrement={() => onDecrement(item.value)}
                />
              </div>
            ))}
          </div>
          <p className='text-xs text-primary-600 mb-[11px] mt-[30px]'>
            성인, 아동, 유아의 나이는 탑승일 기준입니다.
          </p>
          <Button className='w-[160px]'>확인</Button>
        </div>
      )}
    </div>
  )
}
