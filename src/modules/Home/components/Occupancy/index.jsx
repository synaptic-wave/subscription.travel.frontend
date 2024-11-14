import BedIcon from '@/assets/icons/bed.svg?react'
import RedBedIcon from '@/assets/icons/red-bed.svg?react'
import PersonIcon from '@/assets/icons/person.svg?react'
import RedPersonIcon from '@/assets/icons/red-persons.svg?react'
import { Counter } from './Counter'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { useEffect, useRef, useState } from 'react'
import TrashIcon from '@/assets/icons/trash.svg?react'
import classNames from 'classnames'
import { FaBed, FaUser } from 'react-icons/fa'

export function Occupancy({
  value,
  onChange,
  defaultIsOpen,
  rooms,
  hideIcons,
  labelProps = {},
  containerProps = {},
  isRedIcons,
  label
}) {
  const [open, setOpen] = useState(defaultIsOpen)
  const ref = useRef()

  useOutsideClick(ref, () => {
    setOpen(false)
    onChange('reset', { value })
  })

  const totalPerson = value?.reduce(
    (a, b) => a + (b.child || 0) + (b.adults || 0),
    0
  )

  return (
    <div className='w-full relative'>
      <>
        {!!label && (
          <label className='block text-sm leading-[16px] mb-[11px]'>
            {label}
          </label>
        )}
        <div
          {...containerProps}
          onClick={() => setOpen((prev) => !prev)}
          className='text-sm flex justify-start items-center gap-[10px] px-[15px] py-[14.5px] relative transition-all ease-in-out overflow-hidden border border-grey-100 hover:border-primary'
        >
          <div className='flex items-center gap-[6px] text-base leading-[18px]'>
            <FaBed fontSize='24px' color='#909090' />
            객실 {rooms?.length}
          </div>
          <div className='flex items-center gap-[6px] text-base leading-[18px]'>
            <FaUser fontSize='20px' color='#909090' />
            인원 {totalPerson}
          </div>
        </div>
        {open && (
          <div
            ref={ref}
            style={{ boxShadow: '0px 0px 20px 0px #5E66A740' }}
            className='w-[90vw] sm:w-[350px] top-[78px] absolute left-0 p-5 sm:p-[30px] rounded-[10px] bg-white'
          >
            <div className='h-[200px] sm:h-auto overflow-auto pr-2 sm:pr-0 mr-[-8px] sm:mr-0'>
              <div className='flex flex-col gap-2 sm:gap-[14px]'>
                <p className='text-[15px] font-medium leading-[21px]'>객실</p>
                <div className='flex items-center justify-between'>
                  <p className='text-[#5C5F79] text-sm'>객실</p>
                  <Counter
                    value={rooms.length}
                    onIncrement={() => onChange('addRoom')}
                    onDecrement={() => {
                      if (rooms.length > 1)
                        onChange('removeRoom', {
                          id: rooms[rooms.length - 1].id
                        })
                    }}
                  />
                </div>
              </div>

              {rooms.length > 0 &&
                rooms.map((item, idx) => (
                  <>
                    <div className='flex flex-col gap-2 sm:gap-[14px] mt-[20px] sm:mt-[35px]'>
                      <div className='flex w-full justify-between'>
                        <p className='text-[15px] font-medium leading-[21px]'>
                          객실 {idx + 1} 인원 수
                        </p>

                        {idx !== 0 && (
                          <button
                            className='flex'
                            type='button'
                            onClick={() =>
                              onChange('removeRoom', { id: item.id })
                            }
                          >
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='text-[#5C5F79] text-sm'>성인</p>
                        <Counter
                          value={item.adults}
                          onIncrement={() =>
                            onChange('amount', {
                              age: 'adults',
                              key: 'inc',
                              id: item.id
                            })
                          }
                          onDecrement={() => {
                            if (item.adults > 1)
                              onChange('amount', {
                                age: 'adults',
                                key: 'dec',
                                id: item.id
                              })
                          }}
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-between mt-[25px]'>
                      <p className='text-[#5C5F79] text-sm'>아동(만 0~17세)</p>
                      <Counter
                        value={item.child || 0}
                        onDecrement={() => {
                          if (item.child > 0)
                            onChange('amount', {
                              age: 'child',
                              key: 'dec',
                              id: item.id
                            })
                        }}
                        onIncrement={() =>
                          onChange('amount', {
                            age: 'child',
                            key: 'inc',
                            id: item.id
                          })
                        }
                      />
                    </div>
                    <div className='w-full grid grid-cols-3 gap-2 mt-2'>
                      {item.childAges.map((age, index) => (
                        <div
                          className='flex border rounded border-solid border-gray-100 text-[10px] p-1'
                          key={index + 'age'}
                        >
                          <label>아동 {index + 1}</label>
                          <select
                            onChange={(e) =>
                              onChange('childAge', {
                                age: e.target.value,
                                index,
                                id: item.id
                              })
                            }
                            name={`아동 ${index + 1}`}
                            value={age}
                          >
                            {Array.from(Array(18).keys()).map((val) => (
                              <option key={val} value={val}>
                                만 {val}세
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}
      </>
    </div>
  )
}
