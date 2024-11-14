import { useEffect, useRef, useState } from 'react'
import Calendar, { DateObject } from 'react-multi-date-picker'
import moment from 'moment'
import korean from '@/locales/kr_th'
import classNames from 'classnames'
import CalendarIcon from '@/assets/icons/calendar.svg?react'
import { MdCalendarMonth } from 'react-icons/md'

export function RangeDatepicker({
  leftIcon,
  value,
  onChange,
  fullWidth = false,
  isInOneInput = false,
  errors,
  name,
  className,
  defaultIsOpen,
  isVisibleLabel = true,
  labelCheckIn = '체크인',
  labelCheckOut = '체크아웃',
  label,
  labelProps = {},
  containerProps = {},
  icon = <CalendarIcon />,
  onClick = () => {},
  isRedColor,
  ...restProps
}) {
  const [date, setDate] = useState([])
  const datePickerRef = useRef()

  const calculateMaxDate = (startValue) => {
    if (startValue) {
      const maxEndDate = moment(startValue.toDate()).add(28, 'days').toDate()
      return new DateObject(maxEndDate)
    }
    return null
  }

  useEffect(() => {
    if (defaultIsOpen) {
      datePickerRef.current.openCalendar()
    }
  }, [defaultIsOpen])

  useEffect(() => {
    setDate(value)
  }, [value])

  const onUpdateDate = (value) => {
    setDate(value)
  }

  const onConfirmDate = () => {
    onChange(date)
    datePickerRef.current.closeCalendar()
  }

  const onOpen = () => {
    setDate(value)
  }

  return (
    <div onClick={onClick} className={classNames('flex flex-col', className)}>
      <Calendar
        {...restProps}
        range
        onOpen={onOpen}
        value={date}
        currentDate={value[0]}
        autoFocus
        onChange={onUpdateDate}
        arrow={false}
        shadow={false}
        calendarPosition='bottom-center'
        fixMainPosition
        locale={korean}
        plugins={[
          <FooterPlugin
            isRedColor={isRedColor}
            onConfirmDate={onConfirmDate}
            position='bottom'
          />
        ]}
        className={'range-date-picker'}
        numberOfMonths={window.innerWidth > 420 ? 2 : 1}
        minDate={new DateObject()}
        maxDate={date?.length === 2 ? null : calculateMaxDate(date[0])} // Calculate maxDate dynamically based on the start date
        render={
          isInOneInput ? (
            <div className='w-[100%]'>
              {!!label && (
                <label className='block text-sm leading-[16px] mb-[11px]'>
                  {label}
                </label>
              )}
              <div
                {...containerProps}
                className='text-base leading-[20px] w-full flex items-center justify-between px-[15px] py-[15px] relative transition-all ease-in-out overflow-hidden border border-grey-100 hover:border-primary'
                onClick={() => datePickerRef.current.openCalendar()}
              >
                <MdCalendarMonth fontSize='23px' color='#909090' />
                {value?.length > 0
                  ? `${moment(value[0].toDate()).format('YYYY/MM/DD')} ~ ${
                      value[1]
                        ? moment(value[1]?.toDate()).format('YYYY/MM/DD')
                        : '체크아웃 날짜'
                    }`
                  : labelCheckIn}
              </div>
            </div>
          ) : (
            <div className='w-full flex items-center gap-[10px]'>
              <div className='w-[50%]'>
                {isVisibleLabel && (
                  <label
                    {...labelProps}
                    className={classNames(
                      'block text-[10px] text-[#8D8FA2] mb-[6px]',
                      labelProps.className
                    )}
                  >
                    {labelCheckIn}
                  </label>
                )}
                <div
                  {...containerProps}
                  className={classNames(
                    !containerProps.className
                      ? 'font-[500] text-sm w-full flex items-center justify-between px-[16px] py-[14px] relative transition-all ease-in-out rounded-[10px] overflow-hidden outline outline-1 outline-gray-100 hover:outline-primary-600'
                      : containerProps.className,
                    value && value[0] ? 'text-[#161A3F]' : 'text-[#A3A5B8]'
                  )}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {value?.length > 0
                    ? `${moment(value[0].toDate()).format('YYYY/MM/DD')}`
                    : labelCheckIn}
                  {icon}
                </div>
              </div>
              <div className='w-[50%]'>
                {isVisibleLabel && (
                  <label
                    {...labelProps}
                    className={classNames(
                      'block text-[10px] text-[#8D8FA2] mb-[6px]',
                      labelProps.className
                    )}
                  >
                    {labelCheckOut}
                  </label>
                )}
                <div
                  {...containerProps}
                  className={classNames(
                    !containerProps.className
                      ? 'font-[500] text-sm w-full flex items-center justify-between px-[16px] py-[14px] relative transition-all ease-in-out rounded-[10px] overflow-hidden outline outline-1 outline-gray-100 hover:outline-primary-600'
                      : containerProps.className,
                    value && value[1] ? 'text-[#161A3F]' : 'text-[#A3A5B8]'
                  )}
                  onClick={() => datePickerRef.current.openCalendar()}
                >
                  {value?.length > 1
                    ? `${moment(value[1].toDate()).format('YYYY/MM/DD')}`
                    : '체크아웃 날짜'}
                  {icon}
                </div>
              </div>
            </div>
          )
        }
        ref={datePickerRef}
      ></Calendar>
      {errors && errors[name] && errors[name].type === 'required' && (
        <span className='text-xs mt-[5px] text-[#ff0000] block'>
          필수 입력란입니다!
        </span>
      )}
    </div>
  )
}

function FooterPlugin({ onConfirmDate, isRedColor }) {
  return (
    <div className='flex justify-end p-3 w-full'>
      <button
        className='bg-primary-600 font-medium text-xs sm:text-sm py-2 px-5 text-white rounded-[10px]'
        size='sm'
        onClick={onConfirmDate}
        type='button'
      >
        적용
      </button>
    </div>
  )
}
