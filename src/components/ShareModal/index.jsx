import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { Button, Loader } from '..'
import kakaoTalkImg from '@/assets/images/kakaotalk.png'
import emailImg from '@/assets/images/email.png'
import CloseIcon from '@/assets/icons/close.svg?react'
import { Oval } from 'react-loader-spinner'

export function ShareModal({
  isOpen,
  isLoading,
  onClose,
  sessionId,
  customLink
}) {
  const ref = useRef()
  const [isCopied, setIsCopied] = useState(false)

  const link =
    customLink ||
    `${window.location.origin}/hotel-details?sessionId=${sessionId}`

  useOutsideClick(ref, () => {
    if (isOpen) onClose()
  })

  const onClickCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(link)
    setTimeout(() => setIsCopied(false), 3000)
  }

  if (!isOpen) return <></>

  return (
    <div className='fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-50'>
      <div
        ref={ref}
        className='sm:w-[400px] w-[90%] h-[260px] bg-white rounded-xl flex flex-col px-5 py-7 items-center'
        style={{
          'box-shadow': '0px 0px 20px 0px #5E66A740'
        }}
      >
        <div className='relative w-full h-full'>
          <button
            className='absolute right-[-10px]  top-[-16px]'
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <p className='text-[22px] font-medium text-center'>공유하기</p>
          {isLoading ? (
            <div className='flex-1 h-full w-full flex justify-center items-center pb-5'>
              <Oval
                visible={true}
                height='80'
                width='80'
                color='#2D40FF'
                ariaLabel='oval-loading'
                wrapperStyle={{}}
                wrapperClass=''
                secondaryColor='#A8ABBF'
                strokeWidth={3}
              />
            </div>
          ) : (
            <div className='flex w-full flex-1 h-full flex-col'>
              <div className='flex justify-center gap-5 w-full pt-7'>
                {/* <button>
              <img
                src={kakaoTalkImg}
                width={60}
                height={60}
                className="max-h-[60px]"
              />
            </button> */}
                <a href={`mailto: ?subject=Hotel Link&body=${link}`}>
                  <img
                    src={emailImg}
                    width={60}
                    height={60}
                    className='max-h-[60px]'
                  />
                </a>
              </div>
              <div className='border border-gray-100 w-full mt-[34px] rounded-[10px] h-[50px] flex items-center justify-between'>
                <p className='pl-[9px] text-sm text-[#2D40FF] block truncate'>
                  {link}
                </p>
                <Button
                  onClick={onClickCopy}
                  className='w-[100px] whitespace-nowrap'
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                >
                  {isCopied ? '복사됨' : '복사'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
