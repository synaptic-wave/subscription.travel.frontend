import classNames from 'classnames'

export function Tabs({ tabs, activeTab, className, onChange }) {
  return (
    <div className={classNames('flex items-center gap-[24px]', className)}>
      {tabs.map((item) => (
        <button
          className={classNames(
            'text-sm font-medium border-b-2 pb-[10px]',
            activeTab === item.key ? 'text-primary-600' : 'text-[#8D8FA2]',
            activeTab === item.key ? 'border-primary-600' : 'border-white'
          )}
          onClick={() => onChange(item.key)}
          key={item.key}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}
