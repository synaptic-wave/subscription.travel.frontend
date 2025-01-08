import IncIcon from '@/assets/icons/inc.svg?react'
import DecIcon from '@/assets/icons/dec.svg?react'
import classNames from 'classnames'
import { LuMinus } from 'react-icons/lu'
import { GoPlus } from 'react-icons/go'

export function Counter({ value, onIncrement, onDecrement }) {
  return (
    <div className='flex items-center w-[100px] justify-between border border-[#EAEAF4] rounded-[5px] overflow-hidden'>
      <button
        type='button'
        className={classNames(
          'h-[32px] w-[36px] bg-[#EFF5FF] text-[#8D8FA2] flex items-center justify-center'
        )}
        onClick={onDecrement}
      >
        <LuMinus />
      </button>
      <p className='text-sm w-[48px] text-center'>{value}</p>
      <button
        type='button'
        className='h-[32px] text-primary-600 w-[36px] bg-[#EFF5FF] flex items-center justify-center'
        onClick={onIncrement}
      >
        <GoPlus />
      </button>
    </div>
  )
}
