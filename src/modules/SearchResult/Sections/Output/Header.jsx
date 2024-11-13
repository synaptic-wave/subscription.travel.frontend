import { IconButton, Select } from '@/components/index'
import GridIcon from '@/assets/icons/grid.svg?react'
import RowIcon from '@/assets/icons/row.svg?react'
import MapIcon from '@/assets/icons/location-grey.svg?react'
import { viewTypes } from '@/consts'
import { sortArrays } from '@/consts/sorts'
import FilterIcon from '@/assets/icons/filter.svg?react'
import { components } from 'react-select'
import { useDetectIsMobile } from '@/hooks/useDetectIsMobile'

const Option = (props) => {
  return (
    <div className='flex sort_option'>
      <components.Option {...props}>
        <div className='px-4 py-3 hover:bg-[#dbeafe]'>{props?.data?.label}</div>
      </components.Option>
    </div>
  )
}

export function HeaderHotelsResult({
  sort,
  view,
  setView,
  setSort,
  isVisibleSort = true,
  isVisibleFilter = true,
  toggleFilter
}) {
  const isMobile = useDetectIsMobile()
  return (
    <div className='w-full flex justify-between items-center gap-2'>
      <div className='flex flex-col gap-[10px] w-[200px] sm:w-[240px]'>
        {isVisibleSort && (
          <>
            <span className='hidden sm:block text-[#5C5F79] text-[13px]'>
              정렬 기준
            </span>
            <Select
              placeholder='Sort'
              value={sort || sortArrays[1]}
              options={sortArrays}
              onChange={setSort}
              isSearchable={false}
              getOptionLabel={(opt) => opt.label}
              getOptionValue={(opt) => opt.key}
              components={{
                Option
              }}
              size={window.innerWidth < 640 ? 'sm' : 'md'}
            />
          </>
        )}
      </div>

      <div className='flex gap-2'>
        {!isMobile && (
          <IconButton
            icon={<RowIcon />}
            active={viewTypes.ROW === view}
            onClick={() => setView(viewTypes.ROW)}
          />
        )}
        <IconButton
          icon={<GridIcon />}
          active={viewTypes.GRID === view}
          onClick={() => setView(viewTypes.GRID)}
        />
        <IconButton
          icon={<MapIcon />}
          active={viewTypes.MAP === view}
          onClick={() => setView(viewTypes.MAP)}
        />
        {isVisibleFilter && (
          <div className='sm:hidden flex'>
            <IconButton icon={<FilterIcon />} onClick={toggleFilter} />
          </div>
        )}
      </div>
    </div>
  )
}
