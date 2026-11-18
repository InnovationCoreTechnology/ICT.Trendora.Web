import type { ComponentPropsWithoutRef } from "react"

type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
    id: string
    label: string
}

export default function TextField({
id,
label,
className = '',
...props
}: TextFieldProps) {
    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <input 
            {...props}
             id={id}             
             className={`text-input ${className}`.trim()}
            />
        </div>
    )
}