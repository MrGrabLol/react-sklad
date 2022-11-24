import {ChangeEventHandler, useState} from "react";
import '../css/Checkbox.css'

interface MarkProps {
    item: string
}

export function FilterPanelCheckbox({item}: MarkProps, index: number, handler: ChangeEventHandler<HTMLInputElement>) {
    const [isChecked, setIsChecked] = useState(false)

    //handler тут и передать в него массив из пропсов чекбокса, а в него передать из фильтр панели в которую я передам из шоупейдж

    return (
        <label className='check-label'>
            <input type="checkbox" className='check-input' value={item} checked={isChecked} onChange={handler}/>
            <span className='checkmark'></span>
            <p>{item}</p>
        </label>
    )
}