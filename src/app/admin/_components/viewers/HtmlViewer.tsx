"use client"
interface Props {
    htmlContent: string
}

export default function HtmlViewer({ htmlContent }: Props) {
    return (
        <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    )
}