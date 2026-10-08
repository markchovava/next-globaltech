"use client"

type OptionValue = string | number
type OptionItem = OptionValue | { label: OptionValue; value: OptionValue }

interface PropsInterface {
    name: string,
    label?: string,
    data: OptionItem[],
    value?: string | number,
    error?: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function SelectAdminOne({
    name,
    label,
    data,
    value,
    error,
    placeholder = 'Default',
    onChange,
}: PropsInterface) {

    return (
        <div className='flex flex-col gap-1 items-start justify-start'>
            {label &&
                <p className='mb-1 text-xs font-light'>{label}:</p>
            }
            <select
                name={name}
                onChange={onChange}
                value={value ?? ''}
                className='w-full rounded-lg px-3 py-2 outline-none border border-gray-300'>
                <option value="">{placeholder}</option>
                {data.map((item, key) => {
                    const isObject = typeof item === 'object' && item !== null
                    const optionValue = isObject ? item.value : item
                    const optionLabel = isObject ? item.label : item
                    return (
                        <option key={`${optionValue}-${key}`} value={optionValue}>
                            {optionLabel}
                        </option>
                    )
                })}
            </select>
            {error &&
                <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}