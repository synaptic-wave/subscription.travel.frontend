import { Dialog } from '@/components/index'
import useGetAllTerms from '@/hooks/useGetAllTerms'

export function TermsAndConditionsDialog({ isOpen, onClose, src }) {
  const terms = useGetAllTerms()
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className='w-[100%] sm:w-[700px] py-[30px] px-[0]'
    >
      <div className='h-[60vh] overflow-auto'>
        <iframe srcDoc={terms[src]} className='w-full h-full' />
      </div>
    </Dialog>
  )
}
