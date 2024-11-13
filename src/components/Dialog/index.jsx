import { Dialog as ReactDialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import CloseIcon from '@/assets/icons/close.svg?react'

export function Dialog({
  onClose = () => {},
  isOpen,
  className,
  withCloseButton = true,
  children
}) {
  return (
    <Transition appear show={isOpen || false} as={Fragment}>
      <ReactDialog as='div' className='relative z-[9999]' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <ReactDialog.Panel
                className={classNames(
                  'transform overflow-hidden rounded-[10px] bg-white text-left align-middle shadow-xl transition-all',
                  className
                )}
              >
                {withCloseButton && (
                  <button
                    className='absolute top-[8px] right-[10px] sm:top-[16px] sm:right-[16px]'
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </button>
                )}
                {children}
              </ReactDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </ReactDialog>
    </Transition>
  )
}
