import { Button, Dialog, HFInput, Input } from '@/components/index'
import SearchIcon from '@/assets/icons/search-v2.svg?react'
import { useForm } from 'react-hook-form'
import {
  useGetBookedHotel,
  useSendVerificationCode
} from '@/services/book.service'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Header } from '@/components/Header'
import warningGif from '@/assets/gifs/warning.gif'
import CheckIcon from '@/assets/icons/check.svg?react'

const validationSchema = (hasOtp) =>
  yup.object({
    reservationLocator: yup.string().required('이 필드는 필수입니다'),
    email: yup.string().required('이 필드는 필수입니다'),
    otp: hasOtp ? yup.string().required('이 필드는 필수입니다') : ''
  })

export function CheckReservationInfo() {
  const navigate = useNavigate()
  const [isShowOtp, setIsShowOtp] = useState(false)
  const [bookingInfo, setBookingInfo] = useState(null)
  const [isOpenWarning, setIsOpenWarning] = useState(false)
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)
  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchema(isShowOtp))
  })

  const { refetch, isLoading: isLoading2 } = useGetBookedHotel({
    params: {
      email: watch('email'),
      reservationLocator: watch('reservationLocator'),
      otp: watch('otp')
    },
    queryParams: {
      enabled: false,
      onSuccess: () => {
        setBookingInfo({
          email: watch('email'),
          reservationLocator: watch('reservationLocator'),
          otp: watch('otp')
        })
        // navigate('/booked-hotel', {
        //   state: {
        //     email: watch('email'),
        //     reservationLocator: watch('reservationLocator'),
        //     otp: watch('otp')
        //   }
        // })
      },
      onError: (err) => {
        toast.error(err.data.message)
      }
    }
  })
  const { mutate, isLoading } = useSendVerificationCode({
    mutationSettings: {
      onSuccess: () => {
        setIsShowOtp(true)
        setIsOpenSuccess(true)
      },
      onError: (err) => {
        setIsOpenWarning(true)
        // toast.error(err.data.message)
      }
    }
  })

  const onNavigateBookedHotel = () => {
    navigate('/booked-hotel', {
      state: {
        ...bookingInfo
      }
    })
  }

  const onSubmit = (data) => {
    if (!isShowOtp) return mutate(data)
    refetch()
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center justify-center py-[40px] flex-col sm:px-0 px-4'
      >
        <p className='text-xl sm:text-2xl font-medium text-left mb-[8px] flex items-center gap-1'>
          <SearchIcon />
          비회원 예약조회
        </p>
        <p className='text-sm text-[#8D8FA2] mb-[40px]'>
          예약 시 입력한 이메일과 예약번호로 예약을 조회합니다
        </p>
        <div className='w-full sm:w-[430px]'>
          <HFInput
            control={control}
            placeholder='예약번호를 입력해 주세요'
            label='예약번호'
            name='reservationLocator'
            // disabled={isShowOtp}
          />
          <div className='mt-5 flex gap-4 sm:gap-2 sm:flex-row flex-col'>
            <HFInput
              control={control}
              placeholder='이메일을 입력해 주세요'
              name='email'
              className='sm:w-[300px]'
              label='이메일'
              // disabled={isShowOtp}
            />
            <Button
              disabled={!watch('email') || !watch('reservationLocator')}
              type='submit'
              isLoading={isLoading}
              className='flex-auto sm:mt-[25px]'
            >
              인증번호 발송
            </Button>
          </div>
          <div className='mt-5 flex gap-4 sm:gap-2 sm:flex-row flex-col'>
            <HFInput
              control={control}
              placeholder='인증번호를 입력해 주세요'
              className='sm:w-[300px]'
              name='otp'
              label='인증번호'
            />
            <Button
              disabled={!watch('otp') || !isShowOtp}
              className='flex-auto sm:mt-[25px]'
              isLoading={isLoading2}
              type='submit'
            >
              인증 완료
            </Button>
          </div>

          <Button
            onClick={onNavigateBookedHotel}
            disabled={!bookingInfo}
            className='mt-[30px] w-full'
          >
            예약 조회
          </Button>
        </div>
      </form>
      <Dialog
        isOpen={isOpenSuccess || isOpenWarning}
        withCloseButton={false}
        onClose={() => {
          setIsOpenSuccess(false)
          setIsOpenWarning(false)
        }}
        className='sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all '
      >
        <div className='flex flex-col items-center '>
          {isOpenWarning ? (
            <img
              src={warningGif}
              className='w-[80px] h-[80px] object-contain'
            />
          ) : (
            <CheckIcon />
          )}

          <p className='text-xl sm:text-2xl mt-[10px] text-center'>
            {isOpenSuccess ? '메일 발송 성공' : '발송 실패!'}
          </p>
          <p
            className='mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]'
            dangerouslySetInnerHTML={{
              __html: isOpenSuccess
                ? '인증번호를 입력하신 메일로 전송했습니다. <br/>전송된 인증번호를 입력해 주세요!'
                : '입력하신 이메일은 아직 등록되지 않았습니다.<br /> 로그인해서 계정을 만들어주세요!'
            }}
          />
          <Button
            onClick={() => {
              setIsOpenSuccess(false)
              setIsOpenWarning(false)
            }}
            type='button'
            className='w-[180px] mx-auto mt-[50px]'
          >
            {isOpenSuccess ? '확인' : '확인'}
          </Button>
        </div>
      </Dialog>
    </>
  )
}
