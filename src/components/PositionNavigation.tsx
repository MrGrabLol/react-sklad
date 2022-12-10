import {Link} from "react-router-dom";
import "../css/Navigation.css"

export function PositionNavigation() {
    return (
        <nav>
            <span className='block'>
                <Link className='sidebar-btn' to='show'>Информация</Link>
                <Link className='sidebar-btn' to='' >Отгрузка</Link>
                <Link className='sidebar-btn' to='print'>Печать</Link>
            </span>
        </nav>
    )
}