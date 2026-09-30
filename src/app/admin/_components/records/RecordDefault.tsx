"use client"


interface PropInterface {
  label: string
  value: React.ReactNode | string | number
}


export default function RecordDefault(
  { label, value }:
    PropInterface
) {

  return (
    <div className='flex lg:flex-row flex-col items-start justify-start lg:gap-3 gap-1'>
      <div className='lg:w-[20%] leading-tight w-full font-light'>{label}:</div>
      <div className='lg:w-[80%] leading-tight w-full'>{value}</div>
    </div>
  )
}
