import {Link} from "react-router-dom";
import "../css/Navigation.css"

export function Navigation() {
    return (
        <nav>
            <span className='block'>
                <Link className='sidebar-btn' to='/sklad/register'>Регистрация</Link>
                <Link className='sidebar-btn' to='/sklad/show'>Посмотреть все</Link>
                <Link className='sidebar-btn' to='/sklad/search'>Поиск</Link>
                <Link className='sidebar-btn' to='/sklad/melt-search'>Поиск по плавке</Link>
                <Link className='sidebar-btn' to='/sklad/combine'>Объединить</Link>
                <Link className='sidebar-btn' to='/sklad/shipment'>Отгрузка</Link>
                <Link className='sidebar-btn' to='/sklad/shipment-history'>История отгрузок</Link>
                <Link className='sidebar-btn' to='/sklad/admission'>Приёмка</Link>
                <Link className='sidebar-btn' to='/sklad/send'>Отправка на другой склад</Link>
            </span>
        </nav>
    )
}