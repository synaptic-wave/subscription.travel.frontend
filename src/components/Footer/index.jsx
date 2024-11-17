import PhoneIcon from '@/assets/icons/phone.svg?react'
import OriginalIcon from '@/assets/icons/original.svg?react'
import { useState } from 'react'
import { TermsAndConditionsDialog } from './TermsAndConditionsDialog'
import { Button } from '..'

export function Footer() {
  const [open, setOpen] = useState()

  const onClose = () => {
    setOpen(null)
  }
  const onOpen = (value) => {
    setOpen(value)
  }

  return (
    <div className='bg-[#303030]'>
      <footer className='container pt-[40px] pb-[100px] flex flex-col px-[150px]'>
        <p className='text-[15px] leading-[25px] font-bold text-white mb-4'>
          고객센터 1533-7901 / 문의 메일: wafl@wafflestay.kr
        </p>
        <p className='text-[13px] leading-[22px] text-white mb-[13px]'>
          운영시간: 10:00 ~ 17:00 (점심시간 12:00 ~ 13:00 )<br /> 휴무일: 주말,
          공휴일 휴무
        </p>
        <p className='text-[10px] leading-[20px] text-[#A0A0A0] mb-[13px]'>
          문의량이 많을 경우 유선상담 중단 및 이메일 문의하기로 통합 운영 될 수
          있습니다.
        </p>

        <div className='flex gap-2'>
          <Button className='rounded-[16px]' variant='secondary' size='lg'>
            이메일 문의하기
          </Button>
          <Button className='rounded-[16px]' variant='secondary' size='lg'>
            자주 묻는 질문
          </Button>
        </div>

        <p className='mt-[50px] text-white font-bold text-[14px] mb-[10px] leading-[25px]'>
          주식회사 시냅틱웨이브
        </p>

        <p className='text-[10px] leading-[20px] text-[#A0A0A0]'>
          대표이사 : 김세일
          <br />
          <br />
          주소 : 경기도 안양시 동안구 엘에스로 116번길 118, 안양2차 SK V1 센터
          1030호
          <br />
          사업자등록번호:422-86-01896 I 통신판매신고번호: 제2022-안양동안-0425호
          I 종합여행업 등록번호: 제2022-000001호
          <br />
          개인정보보호책임자: 김용태
          <br />
          <br />
          제휴문의: admin@swave.kr
          <br />
          <br />
          주식회사 시냅틱웨이브는 통신판매중개자로서 통신판매의 당사자가 아니며
          상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 공급자에게
          있습니다.
        </p>

        <div className='flex items-center gap-[22px] mt-[44px]'>
          <button
            // to='https://admin.wafflestay.kr/term/service'
            // target='_blank'
            className='text-white text-[13px] leading-[22px]'
            onClick={() => onOpen('service')}
          >
            이용약관
          </button>

          <button
            // to='https://event.wafflestay.kr/policy/privacy'
            // target='_blank'
            className='text-white text-[13px] leading-[22px]'
            onClick={() => onOpen('privacy')}
          >
            개인정보 보호정책
          </button>
          {/* <span className="text-[14px] text-[#E5E6EE] sm:block hidden"> ㅣ</span>
        <button
          // to='https://event.wafflestay.kr/policy/location'
          // target='_blank'
          className="text-[#2D40FF] sm:text-[13px] text-xs sm:block hidden leading-7"
          onClick={() => onOpen("location")}
        >
          위치정보 이용약관
        </button> */}
        </div>

        <TermsAndConditionsDialog
          src={open}
          isOpen={!!open}
          onClose={onClose}
        />
      </footer>
    </div>
  )
}
