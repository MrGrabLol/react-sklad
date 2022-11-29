import {useState} from "react";
import '../css/Checkbox.css'

interface CheckboxProps {
    item: string
    selectedItem: string[],
    selectedHandler: (item: string[]) => void
}

export function FilterPanelCheckbox({item, selectedItem, selectedHandler}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(false)

    function inputChangeHandler(event: { target: { checked: boolean | ((prevState: boolean) => boolean); value: string; }; }) {
        setIsChecked(event.target.checked)
        let updatedList = [...selectedItem]
        if (event.target.checked) {
            updatedList = [...selectedItem, event.target.value]
        } else {
            updatedList.splice(selectedItem.indexOf(event.target.value), 1)
        }
        selectedHandler(updatedList)
    }

    return (
        <label className='check-label'>
            <input type="checkbox" className='check-input' value={item} checked={isChecked} onChange={inputChangeHandler}/>
            <span className='checkmark'></span>
            <p>{item}</p>
        </label>
    )
}