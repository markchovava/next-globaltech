"use client"

interface PropInterface{
    name: string
    css?: string
    type?: "button" | "submit" | "reset"
    onClick?: () => void
}

export default function ButtonAdmin({
  name,
  type='button',
  css,
  onClick
}: PropInterface) {

  return (
    <button type={type} onClick={onClick}
        className={` ${css} cursor-pointer rounded-full text-white 
          transition-all duration-200 ease-initial
          bg-linear-to-br from-blue-500 to-blue-900 
          hover:bg-linear-to-br hover:from-blue-500 hover:to-blue-950`}>
          {name}
    </button>
  )
}
