import classNames from 'classnames'

export function IconButton({ icon, active, onClick, ...props }) {
  return (
    <button
      className={classNames(
        'md:w-[48px] md:h-[48px] w-[36px] h-[36px] flex items-center justify-center border border-gray-500 text-[#A8ABBF] md:text-[26px] text-[21px]',
        {
          ['text-[#2D40FF]']: active,
          ['active-btn']: active
        }
      )}
      style={{
        border: `1px solid ${active ? '#2D40FF' : '#EAEAF4'}`,
        borderRadius: '10px'
      }}
      {...props}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
