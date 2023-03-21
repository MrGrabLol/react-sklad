import {NavLink} from "react-router-dom";
import "../css/Navigation.css"
import {useState} from "react";

export function Navigation() {
    const [activeMenu, setActiveMenu] = useState('')

    return (
        <nav>
            <span className='block'>
                {/*{*/}
                {/*    (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&*/}
                {/*    <NavLink className='sidebar-btn' to='/register'>Регистрация</NavLink>*/}
                {/*}*/}
                {/*<NavLink className='sidebar-btn' to='/show'>Наличие</NavLink>*/}
                {/*<NavLink className='sidebar-btn' to='/search'>Сканирование</NavLink>*/}
                {/*<NavLink className='sidebar-btn' to='/melt-search'>Поиск</NavLink>*/}
                {/*{*/}
                {/*    (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&*/}
                {/*    <NavLink className='sidebar-btn' to='/dispatch'>Отгрузка</NavLink>*/}
                {/*}*/}
                {/*<NavLink className='sidebar-btn' to='/dispatch-history'>История отгрузок</NavLink>*/}
                {/*<NavLink className='sidebar-btn' to='/reserve'>Резервы</NavLink>*/}
                {/*{*/}
                {/*    (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&*/}
                {/*    <NavLink className='sidebar-btn' to='/send'>Отправить</NavLink>*/}
                {/*}*/}
                {/*{*/}
                {/*    (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&*/}
                {/*    <NavLink className='sidebar-btn' to='/admission'>Приёмка</NavLink>*/}
                {/*}*/}
                <span className='span-hoverable-sidebar' onClick={() => setActiveMenu('pos')}>ПОЗИЦИИ
                    {
                        activeMenu === 'pos' &&
                        <div className='sidebar-submenu'>
                            {
                                (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                                <NavLink className='sidebar-span' to='/register'>Регистрация</NavLink>
                            }
                            <NavLink className='sidebar-span' to='/show'>Наличие</NavLink>
                            <NavLink className='sidebar-span' to='/reserve'>Резервы</NavLink>
                        </div>
                    }
                </span>
                <span className='span-hoverable-sidebar' onClick={() => setActiveMenu('search')}>ПОИСК
                    {
                        activeMenu === 'search' &&
                        <div className='sidebar-submenu'>
                            <NavLink className='sidebar-span' to='/search'>Сканирование</NavLink>
                            <NavLink className='sidebar-span' to='/melt-search'>Поиск</NavLink>
                        </div>
                    }
                </span>
                <span className='span-hoverable-sidebar' onClick={() => setActiveMenu('dispatch')}>ОТГРУЗКИ
                    {
                        activeMenu === 'dispatch' &&
                        <div className='sidebar-submenu'>
                            {
                                (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                                <NavLink className='sidebar-span' to='/dispatch'>Отгрузка</NavLink>
                            }
                            <NavLink className='sidebar-span' to='/dispatch-history'>История отгрузок</NavLink>
                        </div>
                    }
                </span>
                {
                    (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <span className='span-hoverable-sidebar' onClick={() => setActiveMenu('send')}>ПЕРЕВОЗКА
                        {
                            activeMenu === 'send' &&
                            <div className='sidebar-submenu'>
                                <NavLink className='sidebar-span' to='/send'>Отправить</NavLink>
                                <NavLink className='sidebar-span' to='/admission'>Приёмка</NavLink>
                                <NavLink className='sidebar-span' to='/send-history'>История перевозок</NavLink>
                            </div>
                        }
                    </span>
                }
            </span>
        </nav>
    )
}