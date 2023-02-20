import {NavLink} from "react-router-dom";
import "../css/Navigation.css"
import {useState} from "react";

export function Navigation() {

    const [classId, setClassId] = useState('')

    // function clickTracker(event: { target: { className: string; }; }) {
    //         if (document.querySelector('#nvbr .sidebar-btn .selected-el') !== null) {
    //             document.querySelector('#nvbr .sidebar-btn .selected-el')!.classList.remove('selected-el');
    //         }
    //         event.target.className = "active";
    // }

    // function checkActiveId() {
    //
    // }

    return (
        <nav>
            <span className='block'>

                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='/register'>Регистрация</NavLink>
                }
                <NavLink className='sidebar-btn' to='/show'>Наличие</NavLink>
                <NavLink className='sidebar-btn' to='/search'>Сканирование</NavLink>
                <NavLink className='sidebar-btn' to='/melt-search'>Поиск</NavLink>
                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='/shipment'>Отгрузка</NavLink>
                }
                <NavLink className='sidebar-btn' to='/shipment-history'>История отгрузок</NavLink>
                <NavLink className='sidebar-btn' to='/reserve'>Резервы</NavLink>
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Объединить</Link>*/}
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Приёмка</Link>*/}
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Отправка на другой склад</Link>*/}
            </span>
        </nav>
    )
}