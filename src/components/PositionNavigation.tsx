import {NavLink} from "react-router-dom";
import "../css/Navigation.css"

export function PositionNavigation() {
    return (
        <nav>
            <span className='block'>
                <NavLink className='sidebar-btn' to='info'>Информация</NavLink>
                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='dispatch' >Отгрузка</NavLink>
                }
                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='print'>Печать</NavLink>
                }
                <NavLink className='sidebar-btn' to='history'>История</NavLink>
            </span>
        </nav>
    )
}