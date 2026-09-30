"use client"



interface Props {
    name: string
}

export default function LabelOne({ name }: Props) {
    return (
        <p className='px-4 py-1 text-sm bg-slate-800 text-white rounded-md'>
            {name}
        </p>
    )
}
