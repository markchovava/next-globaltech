import React from 'react'


interface PropInterface{
    label: string | number,
    css: string
}

export default function StickerDefault({label, css}: PropInterface) {
    const otherCss = 'text-white rounded-md'
    switch(label){
        case 'Read':
            return (
                <span className={`${css} ${otherCss} bg-blue-700`}>
                    {label}</span>
            )
        case 'Unread':
            return (
                <span className={`${css} ${otherCss} bg-green-700`}>
                    {label}</span>
            )
        case 'Sent':
            return (
                <span className={`${css} bg-sky-700 ${otherCss}`}>
                    {label}</span>
            )
        default:
            return(
                <span className={`${css} bg-gray-700 ${otherCss}`}>
                    {label}</span>
            )
    }
}
