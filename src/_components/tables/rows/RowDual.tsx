"use client"



interface Props {
    name: string
    value: string | number
}
export default function RowDual({ name, value }: Props) {
    return (
        <div className='grid grid-cols-2 border border-gray-300'>
            <div className='border-r border-gray-300 py-1 px-3'>
                {name}
            </div>
            <div className='col-span-1 px-3 py-1'>
                {value}
            </div>
        </div>
    )
}
