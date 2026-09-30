"use client"

interface PropInterface{
    title: string
    css: string
}


export default function HeadingSecondary({title, css}: PropInterface) {
  return (
    <>
    <h1 className={`${css} font-extrabold text-[2rem] leading-tight`}>
        {title}
    </h1>
    </>
  )
}