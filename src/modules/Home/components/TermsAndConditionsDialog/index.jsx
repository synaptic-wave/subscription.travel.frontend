import { Dialog, Modal } from '@/components/index'
import CloseIcon from '@/assets/icons/close.svg?react'

export function TermsAndConditionsDialog({ isOpen, onClose }) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className='w-[90%] sm:w-[700px] py-[30px] px-[26px]'
    >
      <div className='h-[60vh] overflow-auto mr-[-26px] pr-[26px]'>
        <h3 className='text-lg mb-[15px] font-medium'>
          [최저가 보상제 이용약관]
        </h3>
        <p className='text-xs text-[#5C5F79]'>
          컬쳐랜드 트래블은 고객님들께 최적의 객실 요금을 제공하는 것을 목표로
          하고 있습니다. 최저가 보장 호텔을 예약하신 경우, 다른 플랫폼에서
          동일한 날짜와 동일한 객실 유형에 대해 더 저렴한 가격을 발견하신 경우,
          해당 차액에 대한 환불을 요청하실 수 있습니다. 요청이 승인되면 차액을
          환불해 드립니다. 
        </p>
        <h4 className='text-base font-medium mt-[20px]'>환불 • 요청 • 제출</h4>
        <p className='text-xs text-[#5C5F79] mt-[9px]'>
          당사의 wafl@wafflestay.kr 로 타 사이트의 가격관련 정보, 스크린샷 및 더
          저렴한 가격을 발견한 웹사이트 주소를 예약 체크인 날짜 1일 전, 정오
          12:00 (호텔 현지 시간)까지 제출해 주세요. 
        </p>
        <h4 className='text-base font-medium mt-[20px]'>중요 안내</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            당사가 최저가 보장을 제공하는 취소되지 않은 확정된 예약만 요청
            가능합니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            더 저렴한 가격을 발견한 플랫폼의 스크린샷을 제공해 주세요.
            스크린샷에는 호텔 이름, 객실 유형, 체크인&체크아웃 날짜, 객실 요금,
            해당 요청 관련 기타 정보가 명확하게 표시되어 있어야 합니다.
          </li>
        </ul>
        <h3 className='text-lg mt-[22px] font-medium'>심사 기준 </h3>
        <h4 className='text-base font-medium mt-[20px]'>객실 유형 일치</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            최저가 보장제를 요청하고자 하는 객실 유형은 예약한 객실 유형과
            반드시 같아야 합니다. 반드시 같은 호텔의 객실 유형이어야 하며, 다음
            세부 사항도 같아야 합니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            세부 사항: 조식 포함 여부, 침대 종류, Wi-Fi 제공 여부, 객실 크기,
            결제 방법, 투숙객 인원수, 변경 및 취소 규정, 예약 이용약관, 보증금
            규정 (해당하는 경우), 무료 특전 제공 여부, 기타 적용 가능한 객실
            정보.
          </li>
        </ul>
        <h4 className='text-base font-medium mt-[20px]'>예약 일치</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            최저가 보장제를 요청하고자 하는 체크인&체크아웃 날짜는 예약한
            체크인&체크아웃 날짜와 반드시 일치해야 합니다.
          </li>
        </ul>
        <h4 className='text-base font-medium mt-[20px]'>가격 조건</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            찾으신 더 저렴한 가격은 모든 사용자가 예약 가능한 가격이어야 합니다.
            제한 사항이 적용된 가격, 회원 전용 가격은 적용되지 않습니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            찾으신 더 저렴한 가격이 할인코드 적용 후 가격이거나, 다른 웹사이트
            프로모션 적용 후 가격인 경우에는 적용되지 않습니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            찾으신 더 저렴한 가격은 반드시 단독으로 예약할 수 있어야 합니다.
            그룹 투어의 일부, 항공 + 호텔 패키지 예약의 일부 등 다른 상품과
            예약하는 경우에 이용 가능한 가격은 적용되지 않습니다.
          </li>
        </ul>
        <h4 className='text-base font-medium mt-[20px]'>예약 조건</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            당사가 명시적으로 최저가 보장제로 지정한 호텔에 한합니다.
          </li>
        </ul>
        <h4 className='text-base font-medium mt-[20px]'>적용 가능 가격</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            최저가 보장제는 호텔 공식 웹사이트 및 다음 호텔 예약 웹사이트에
            표시된 가격에 적용됩니다: 아고다(Agoda), 부킹닷컴(Booking.com),
            익스피디아(Expedia), 호텔스닷컴(Hotels.com), 카약(KAYAK),
            라스트미닛닷컴(Lastminute.com), 오비츠(Orbitz),
            프라이스라인(Priceline), 야놀자, 여기어때.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            찾으신 더 저렴한 가격이 앞서 언급한 웹사이트 중 하나에서 제공하는
            가격이 아닐 경우, 최저가 보장제가 적용되지 않습니다.
          </li>
        </ul>
        <h4 className='text-base font-medium mt-[20px]'>중요 안내</h4>
        <ul className='mt-[9px] list-disc pl-4'>
          <li className='text-xs text-[#5C5F79]'>
            환불 가능한 차액은 최대 USD1,500 또는 이에 상응하는 기타 통화
            금액입니다. (환율은 요청 제출 당시의 환율이 적용됩니다.)
          </li>
          <li className='text-xs text-[#5C5F79]'>
            가격 비교는 사전 결제 시 사용된 통화를 기준으로 합니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            당사 호텔 예약 시 할인코드를 적용한 경우, 가격 비교는 모든 할인코드
            적용 후 당사 가격 (세금 포함)을 기준으로 합니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            가격 보장제 요청은 예약 1건당 1회만 허용됩니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            차액 환불 요청이 당사에서 승인된 후에는 예약 변경이 불가합니다.
          </li>
          <li className='text-xs text-[#5C5F79]'>
            당사는 최저가 보장제 적용 여부 관련 재량권을 행사할 권한을 갖습니다.
            이는 찾으신 더 저렴한 가격의 호텔, 객실 유형, 숙박일 조건이 당사
            예약과 일치하는지의 여부, 차액 환불 요청이 모든 이용약관에
            충족되는지의 여부를 포함하며, 이에 국한되지 않습니다.
          </li>
        </ul>
      </div>
    </Dialog>
  )
}
