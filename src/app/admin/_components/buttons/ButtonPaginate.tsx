import IconDefault from '@/_components/icons/IconDefault'


interface PropInterface{
  btnType: string
  onClick: () => void
}

export default function ButtonPaginate({ btnType, onClick}: PropInterface) {

  switch(btnType) {
    case 'prev':
      return (
        <button onClick={onClick} type='button' className={`cursor-pointer rounded-full overflow-hidden border border-gray-300 px-8 py-2 
            flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-200 ease-initial transition-colors duration-200`}>
            <IconDefault css='' type='left' />
            Prev
        </button>
      )
    case 'next':
      return (
        <button onClick={onClick} type='button' className={`cursor-pointer rounded-full overflow-hidden border border-gray-300 px-8 py-2 
            flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-200 ease-initial transition-colors duration-200`}>
            Next
            <IconDefault css='' type='right' />
        </button>
      )
    default:
      return ""

  }

  
}
