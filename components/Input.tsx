import { ChangeEvent } from "react";

interface InputProps {
    name: string;
    value: string;
    placeholder: string;
    error?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
    name,
    value,
    placeholder,
    error,
    onChange,
}: InputProps) {

    return (
        <div className="mb-4">

            <input
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-300 rounded p-2"
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}

        </div>
    );
}