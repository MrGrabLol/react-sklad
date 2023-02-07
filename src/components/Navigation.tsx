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
                <Link className='sidebar-btn' to='/shipment'>Отгрузка</Link>
                <Link className='sidebar-btn' to='/shipment-history'>История отгрузок</Link>
                <Link className='sidebar-btn' to='/reserve'>Резервы</Link>
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Объединить</Link>*/}
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Приёмка</Link>*/}
                {/*<Link className='sidebar-btn' to='/' style={{backgroundColor: 'grey', border: '2px solid grey'}}>Отправка на другой склад</Link>*/}
            </span>
        </nav>
    )
}