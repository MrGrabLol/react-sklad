import React from "react";
import '../css/ErrorMessage.css'

interface ErrorMessageProps {
    error: string
}

export function ErrorMessage({error}: ErrorMessageProps) {
    return (
        <p className='error'>Ошибка</p>
    )
}