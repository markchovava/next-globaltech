"use client"

import IconDefault from "@/_components/icons/IconDefault"
import { useRef, useState, ChangeEvent } from "react"

interface PropInterface {
    label?: string
    name: string
    value?: string
    onChange: (e: any) => void // Keep it flexible to match your Zustand handler
    error?: string
}

export default function ImageInputDefault({
    label,
    name,
    value = '/assets/img/no_photo.jpg',
    error,
    onChange
}: PropInterface) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = useState<string | undefined>(value)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // 1. Set Local Preview
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            onChange(file)
        }
    };

    const handleRemove = () => {
        setImagePreview(undefined);
        onChange(null)
        if (fileInputRef.current) fileInputRef.current.value = "";

    };

    return (
        <div className='w-full'>
            {label && <p className='mb-1 font-light'>{label}</p>}
            <div className="w-[100%] relative aspect-4/3 overflow-hidden rounded-lg bg-gray-50 drop-shadow-md group">
                {/* Background Icon */}
                <div className='w-full h-full absolute flex items-center justify-center'>
                    <IconDefault type='upload' css='text-5xl text-gray-400' />
                </div>

                {/* Preview Image */}
                {imagePreview && (
                    <div className="absolute inset-0 z-10">
                        <img src={imagePreview} className="h-full w-full object-cover" alt="preview" />
                    </div>
                )}

                {/* Overlay Controls (Visible on hover) */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-full cursor-pointer bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700"
                    >
                        {imagePreview ? 'Change' : 'Add'}
                    </button>
                    {imagePreview && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="rounded-full cursor-pointer bg-red-600 px-3 py-1 text-white text-sm hover:bg-red-700"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            <input
                type="file"
                ref={fileInputRef}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}