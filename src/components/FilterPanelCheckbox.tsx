import {useState} from "react";
import '../css/Checkbox.css'

interface MarkProps {
    mark: string
}

export function FilterPanelCheckbox({mark}: MarkProps) {
    const [checked, setChecked] = useState(false)

    const inputChangeHandler = () => {
        setChecked(!checked)
    }

    return (
        <label className='check-label'>
            <input type="checkbox" className='check-input' checked={checked} onChange={inputChangeHandler}/>
            <span className='checkmark'></span>
            <p>{mark}</p>
        </label>
    )
}