import { useState } from 'react'
import { Header } from '@/components/Header'
import { SubHeader } from './components/SubHeader'
import Tabs from '@/components/Tabs'
import { Hotel } from './Hotel'
import { Aviation } from './Aviation'

const elements = [
  {
    label: '숙소'
  },
  {
    label: '항공'
  },
  {
    label: '여행자보험'
  }
]

const renderer = {
  0: Hotel,
  1: Aviation
}

export function Home() {
  const [activeTab, setActiveTab] = useState(0)

  const onChangeTab = (index) => {
    setActiveTab(index)
  }

  const Component = renderer[activeTab]

  return (
    <>
      <Header />
      <SubHeader />
      <div className='container pt-[26px]'>
        <Tabs
          activeIndex={activeTab}
          onChangeTab={onChangeTab}
          elements={elements}
        />
      </div>

      <div className='py-[28px]'>
        <Component />
      </div>
    </>
  )
}
