import {Link} from "react-router-dom";
import "../css/Navigation.css"

export function PositionNavigation() {
    return (
        <nav>
            <span className='block'>
                <Link className='sidebar-btn' to=''>Информация</Link>
                <Link className='sidebar-btn' to='dispatch' >Отгрузка</Link>
                <Link className='sidebar-btn' to='print'>Печать</Link>
                <Link className='sidebar-btn' to=''>История</Link>
            </span>
        </nav>
    )
}