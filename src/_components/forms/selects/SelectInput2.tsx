"use client"

import React from 'react';

interface Props {
    name: string;
    value: string | number;
    data: any[];
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error: string | number
}

export default function SelectInput2({
    name,
    value,
    data,
    label,
    onChange,
    error,
}: Props) {
    // Ensure we return null if data is missing, as React components 
    // shouldn't just return a boolean check.
    if (!data) return null;

    return (
        <div className="text-sm">
            {label && (
                <p className="font-medium text-sm text-gray-700 mb-1">
                    {label}:
                </p>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-1 rounded-lg outline-none border border-gray-300 
                focus:border-gray-400 transition__effect`}>
                {/* Added value="" to the placeholder */}
                <option value="" disabled>Select an Option.</option>
                {data.map((i, key) => (
                    <option
                        key={key}
                        value={i.value}>
                        {i.name}
                    </option>
                ))}
            </select>
            {error &&
                <p className="text-sm text-red-600 font-light">
                    {error}</p>
            }
        </div>
    );
}