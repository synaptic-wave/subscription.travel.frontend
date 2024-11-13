import { Header } from '@/components/Header'
import { useState } from 'react'
import classNames from 'classnames'
import { useGetBookingHistory } from '@/services/book.service'
import { ReservationInfoCard } from './components/ReservationInfoCard'
import { RangeDatepicker } from '../Home/components/RangeDatepicker'
import { DateObject } from 'react-multi-date-picker'
import moment from 'moment'
import noBookingImg from '@/assets/images/no-booking.png'
import { Oval } from 'react-loader-spinner'
import { Button } from '@/components/index'
import { useNavigate } from 'react-router-dom'

const today = new DateObject().add(1, 'days')

const secondDayOfNextMonth = new DateObject({
  year: today.year,
  month: today.month.number,
  day: today.day + 1
})

const months = ['1', '3', '6', '12']

export function ReservationList() {
  const navigate = useNavigate()
  const [reservationTab, setReservationTab] = useState('1')
  const [list, setList] = useState([])
  const [amountData, setAmountData] = useState(0)
  const [page, setPage] = useState(1)
  const [filterType, setFilterType] = useState('tab')
  const [filterTypeData, setFilterTypeData] = useState('tab')
  const [filter, setFilter] = useState('1')
  const [filterDate, setFilterDate] = useState([])
  const onChangeTab = (value) => {
    setReservationTab(value)
    setFilterTypeData('tab')
  }

  const [date, setDate] = useState([today, secondDayOfNextMonth])
  const { refetch, isLoading, isFetching } = useGetBookingHistory({
    params: {
      filter: filterType === 'tab' ? filter : undefined,
      page: page,
      limit: 10,
      dateFrom:
        filterDate.length > 1 && filterType === 'date'
          ? moment(filterDate[0].toDate()).format('yyyy-MM-DD')
          : undefined,
      dateTo:
        filterDate.length > 1 && filterType === 'date'
          ? moment(filterDate[1].toDate()).format('yyyy-MM-DD')
          : undefined
    },
    queryParams: {
      enabled: true,
      onSuccess: (res) => {
        setAmountData(res?.totalResults)
        if (page === 1 && res.results.length === 0) {
          setList([])
          return
        }
        if (list.length === 0) {
          setList((prev) => [...prev, ...res.results])
        } else {
          const _results = {}
          res.results.forEach((element) => {
            _results[element._id] = element
          })
          const _list = JSON.parse(JSON.stringify(list))
          _list.forEach((element, index) => {
            if (_results[element._id]) {
              _list[index] = _results[element._id]
              delete _results[element._id]
            }
          })
          const _values = Object.values(_results)
          setList([..._list, ..._values])
        }
      }
    }
  })

  const onChangeFilter = () => {
    setFilterType(filterTypeData)
    setFilter(reservationTab)
    setFilterDate(date)
    setPage(1)
  }

  const onChangeDate = (value) => {
    setDate(value)
  }

  return (
    <>
      <Header />
      <div className='container mx-auto px-4'>
        <div className='flex flex-col gap-[17px] sm:flex-row sm:items-center justify-between sm:mt-[50px] mt-[20px]'>
          <p className='text-xl sm:text-2xl font-medium text-left '>
            나의 예약 정보
          </p>
          <div className='flex flex-wrap  items-end gap-[10px]'>
            {months.map((month) => (
              <button
                onClick={() => onChangeTab(month)}
                key={month}
                className={classNames(
                  'py-[14px] px-[20px] text-sm border rounded-[10px]',
                  reservationTab === month && filterTypeData === 'tab'
                    ? 'border-[#2D40FF] text-[#2D40FF]'
                    : 'border-[#EAEAF4]'
                )}
              >
                {month}개월
              </button>
            ))}

            <RangeDatepicker
              value={date}
              onChange={onChangeDate}
              isVisibleLabel={false}
              onClick={() => setFilterTypeData('date')}
              format='YYYY/MM/DD'
              fullWidth
              className='w-full sm:w-[300px]'
            />
            <button
              onClick={onChangeFilter}
              className='flex justify-center sm:w-auto w-full py-[13px] px-[20px] text-sm border rounded-[10px] border-[#2D40FF] text-[#2D40FF]'
            >
              {isFetching ? (
                <Oval
                  visible={true}
                  height='20'
                  width='20'
                  ariaLabel='color-ring-loading'
                  color={'#2D40FF'}
                  strokeWidth={5}
                  secondaryColor={'#9ca3af'}
                />
              ) : (
                '조회'
              )}
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          {list?.length > 0 ? (
            list
              ?.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
                // if (a.status === 'COMPLETED' && b.status === 'CANCELLED') {
                //   return -1
                // }
                // if (a.status === 'CANCELLED' && b.status === 'COMPLETED') {
                //   return 1
                // }
                // return 0
              })
              ?.map((item, index) => (
                <ReservationInfoCard
                  refetch={refetch}
                  key={item._id}
                  group={item.group}
                  data={item}
                />
              ))
          ) : (
            <div className='w-full flex flex-col justify-center items-center gap-[58px] my-24'>
              <img src={noBookingImg} />

              <p className='text-center text-[#5C5F79] text-lg text-normal'>
                고객님의 예약내역이 없습니다. <br />
                이제 저희와 여행을 떠나실 준비가 되셨나요???
              </p>

              <Button
                style={{
                  width: 200
                }}
                onClick={() => navigate('/')}
              >
                상품 구경하러 가기
              </Button>
            </div>
          )}
        </div>
        {amountData > list.length && (
          <div className='flex justify-center mt-[50px]'>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className='py-[15px] px-[50px] w-[225px] rounded-[10px] text-[#2D40FF] border border-[#2D40FF] text-[14px] mx-auto flex justify-center'
            >
              {isLoading ? (
                <Oval
                  visible={true}
                  height='20'
                  width='20'
                  ariaLabel='color-ring-loading'
                  color={'#2D40FF'}
                  strokeWidth={5}
                  secondaryColor={'#9ca3af'}
                />
              ) : (
                '나의 예약정보 더보기'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
