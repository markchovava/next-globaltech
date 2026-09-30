
interface PropsInterface{
    title: string
}

export default function HeadingDefault({ title }: PropsInterface) {
  return (
    <div className="container__primary">
        <h2 className="text-5xl font-extrabold mb-2">
            {title}
        </h2>
        <div className="w-30 h-2 bg-blue-800"></div>
    </div>
  )
}
