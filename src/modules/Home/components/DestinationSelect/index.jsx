import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { AiOutlineSwap } from 'react-icons/ai'

export function DestinationSelect({ label }) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef()

  useOutsideClick(ref, () => {
    setIsOpen(false)
  })

  return (
    <div className='relative'>
      <div>
        <label className='text-sm leading-[16px] text-[#374248] mb-[11px] block'>
          {label}
        </label>
        <div className='border h-[55px] border-grey-100 pt-[5px] px-[15px] pb-[8px] flex items-center justify-between'>
          <div className='flex flex-col gap-[4px]'>
            <p className='text-lg font-medium leading-[22px] uppercase'>ICN</p>
            <p className='text-xs text-[#909090] uppercase'>INCHEON</p>
          </div>
          <AiOutlineSwap fontSize='24px' />
          <div className='flex flex-col gap-[4px]'>
            <p
              onClick={() => setIsOpen((prev) => !prev)}
              className='text-lg font-medium leading-[22px] uppercase'
            >
              ICN
            </p>
            <p className='text-xs text-[#909090] uppercase'>도착지 선택</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='px-[20px] py-[66px] absolute rounded-[10px] bg-white w-[500px] left-0 top-[100px]'
          style={{
            boxShadow: '1px 4px 5px 0px #02020245'
          }}
          ref={ref}
        >
          <p className='text-lg leading-[22px] font-semibold mb-[14px]'>
            주요도시 바로선택
          </p>
          <div className='flex flex-col gap-[40px]'>
            <div className='flex flex-col gap-[20px]'>
              <p className='py-[9px] text-md leading-[22px] bg-[#EAEAF4] text-center'>
                대양주
              </p>
              <div className='grid grid-cols-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                  <p className='text-sm leading-[16px] text-center'>타이티</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
