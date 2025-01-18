import { useState } from 'react'
import { useGetSections } from '@/services/section.service'
import classNames from 'classnames'
import { RoundTrip } from './RoundTrip'
import { OneWay } from './OneWay'

const items = [
  {
    title: '왕복',
    value: 'round-trip'
  },
  {
    title: '편도',
    value: 'one-way'
  },
  {
    title: '다구간',
    value: 3
  }
]

const components = {
  'round-trip': <RoundTrip />,
  'one-way': <OneWay />
}

export function Aviation() {
  const [activeTab, setActiveTab] = useState('round-trip')

  const { data } = useGetSections({
    params: {
      page: 1,
      page_size: 1000,
      sortBy: 'order:asc'
    }
  })

  const Renderer = components[activeTab]

  return (
    <div className='container'>
      <div className='flex items-center gap-[24px] mb-[36px]'>
        {items.map((item) => (
          <button
            className={classNames('text-[20px] font-normal leading-[24px]', {
              'text-primary-600 font-bold': activeTab === item.value
            })}
            onClick={() => setActiveTab(item.value)}
          >
            {item.title}
          </button>
        ))}
      </div>
      {Renderer}
    </div>
  )
}
