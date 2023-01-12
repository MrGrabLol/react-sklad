import {Link} from "react-router-dom";
import "../css/Navigation.css"

export function Navigation() {
    return (
        <nav>
            <span className='block'>
                <Link className='sidebar-btn' to='/register'>Регистрация</Link>
                <Link className='sidebar-btn' to='/show'>Наличие</Link>
                <Link className='sidebar-btn' to='/search'>Сканирование</Link>
                <Link className='sidebar-btn' to='/melt-search'>Поиск</Link>
                {/*// @ts-ignore*/}
                <Link className='sidebar-btn' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Объединить</Link>
                <Link className='sidebar-btn' to='/shipment'>Отгрузка</Link>
                <Link className='sidebar-btn' to='/shipment-history'>История отгрузок</Link>
                {/*// @ts-ignore*/}
                <Link className='sidebar-btn' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Приёмка</Link>
                {/*// @ts-ignore*/}
                <Link className='sidebar-btn' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Отправка на другой склад</Link>
            </span>
        </nav>
    )
}