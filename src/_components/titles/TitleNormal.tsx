"use client"


interface Props {
    name?: string
    title?: string
    theme?: 'dark' | 'light'
}

export default function TitleNormal({
    name = '',
    title = '',
    theme = 'light'
}: Props) {
    const color1 = theme === 'dark' ? 'text-cyan-300' : 'text-cyan-900'
    const color2 = theme === 'dark' ? 'text-white border-b border-cyan-600' : 'text-neutral-900 border-b border-gray-200'
    return (
        <>
            {title &&
                <span className={`font-semibold text-xs mb-6 tracking-[0.25em] uppercase ${color1}`}>
                    {title}
                </span>
            }
            {name &&
                <h2 className={` ${color2} text-4xl lg:text-5xl font-light tracking-tight pb-2`}>
                    {name}
                </h2>
            }
        </>

    )
}
