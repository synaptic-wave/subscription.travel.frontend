import { paymentMethods } from '@/consts/paymentMethods'
import moment from 'moment'

export default function BookForm({
  paxes,
  reservationLocator,
  createdAt,
  paymentMethod,
  status
}) {
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-[20px] font-medium'>고객 예약 정보</h2>
      <div className='mt-[26px] flex flex-col gap-5 sm:gap-[30px]'>
        {paxes?.map((item) => (
          <div className='flex flex-col gap-2 sm:gap-[20px]'>
            {paxes.length > 1 && (
              <h4 className='text-base font-medium'>성인 {item.idPax}</h4>
            )}
            <div className='grid grid-cols-2 gap-2 sm:gap-5'>
              <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
                <p className='text-[13px] text-[#5C5F79]'>성(영문사용)</p>
                <p className='text-sm'>{item.surname}</p>
              </div>
              <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
                <p className='text-[13px] text-[#5C5F79]'>이름(영문사용)</p>
                <p className='text-sm'>{item.name}</p>
              </div>
              {item.phoneNumber && (
                <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
                  <p className='text-[13px] text-[#5C5F79]'>핸드폰</p>
                  <p className='text-sm'>{item.phoneNumber}</p>
                </div>
              )}
              {item.email && (
                <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
                  <p className='text-[13px] text-[#5C5F79]'>이메일</p>
                  <p className='text-sm'>{item.email}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-col mt-[30px] pt-[30px] pb-[30px] border-t border-b border-gray-100'>
        <h2 className='text-[20px] font-medium'>예약 정보</h2>

        <div className='grid grid-cols-2 w-full gap-2 sm:gap-5 mt-[20px] sm:mt-[26px]'>
          <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
            <p className='text-[13px] text-[#5C5F79]'>예약상태</p>
            <p className='text-sm'>{status}</p>
          </div>
          <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
            <p className='text-[13px] text-[#5C5F79]'>예약번호</p>
            <p className='text-sm'>{reservationLocator}</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-[30px]'>
        <h2 className='text-[20px] font-medium'>예약 정보</h2>

        <div className='grid grid-cols-2 w-full gap-2 sm:gap-5 mt-[20px] sm:mt-[26px]'>
          <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
            <p className='text-[13px] text-[#5C5F79]'>결제구분</p>
            <p className='text-sm'>{paymentMethods[paymentMethod]}</p>
          </div>
          <div className='flex flex-col gap-[5px] sm:gap-[10px]'>
            <p className='text-[13px] text-[#5C5F79]'>결제일시</p>
            <p className='text-sm'>
              {moment(new Date(createdAt)).format('YYYY년 MM월 DD일 HH:mm:ss ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
