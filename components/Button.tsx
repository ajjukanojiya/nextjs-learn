 
//  import { Employee } from "@/types/employee";
//  interface ButtonProps {
//     onClose: () => void;
//     onSave: () => void;
//     isSaving: boolean;
//     employee: Employee;
// }


interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
}


export default function Button({
    children,
    onClick,
    disabled = false,
    className = "",
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
}