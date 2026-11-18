import type { ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<"button">

export default function Button({
    children,
    className = '',
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button 
         {...props}
         type={type} 
         className={`button ${className}`.trim()}
         >
            {children}
        </button>
    )
}
