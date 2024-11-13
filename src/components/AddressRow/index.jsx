import LocationIcon from '@/assets/icons/location.svg?react'
import classNames from 'classnames'
import { useState } from 'react'

export function AddressRow({ className, address }) {
  const [isCopied, setIsCopied] = useState(false)
  const onCopyAddress = async () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <div
      className={classNames(
        'flex items-center gap-[5px] sm:gap-[10px]',
        className
      )}
    >
      <div className='min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center bg-[#F3F3FB]'>
        <LocationIcon />
      </div>
      <p className='text-[#5C5F79] text-xs sm:text-[13px] leading-[18px]'>
        {address}
        <button
          data-tooltip-id='dark-tooltip'
          data-tooltip-content={isCopied ? 'Copied' : 'Copy'}
          onClick={onCopyAddress}
          className='text-[13px] text-[#17A2B8] leading-[18px] sm:ml-[10px] ml-[5px] inline-block'
        >
          주소 복사
        </button>
      </p>
    </div>
  )
}
