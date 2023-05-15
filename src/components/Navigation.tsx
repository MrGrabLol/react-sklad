import {NavLink} from "react-router-dom";
import "../css/Navigation.css"
import {useState} from "react";

export function Navigation() {
    // const [activeMenu, setActiveMenu] = useState('')

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
                {/*<NavLink className='sidebar-btn' to='/send-history'>История перевозок</NavLink>*/}


                <span className='span-hoverable-sidebar' onClick={() => {
                    document.getElementById('submenu1')!.style.maxHeight =
                        (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) ? '160px' : '120px'
                    document.getElementById('submenu2')!.style.maxHeight = '0'
                    document.getElementById('submenu3')!.style.maxHeight = '0'
                    document.getElementById('submenu4')!.style.maxHeight = '0'
                    document.getElementById('arrow1')!.classList.add('adown')
                    document.getElementById('arrow2')!.classList.remove('adown')
                    document.getElementById('arrow3')!.classList.remove('adown')
                    document.getElementById('arrow4')!.classList.remove('adown')
                }}>
                    <span><label htmlFor="">ПОЗИЦИИ</label><i id='arrow1' className="arrow down"></i></span>
                    {/*{*/}
                    {/*    activeMenu === 'pos' &&*/}
                    {/*    */}
                    {/*}*/}
                    </span>
                    <div id='submenu1' className='sidebar-submenu'>
                            {
                                (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                                <li><NavLink className='sidebar-span' to='/register'>Регистрация</NavLink></li>
                            }
                        <li><NavLink className='sidebar-span' to='/show'>Наличие</NavLink></li>
                        <li><NavLink className='sidebar-span' to='/reserve'>Резервы</NavLink></li>
                        <li><NavLink className='sidebar-span' to='/prices'>Цены</NavLink></li>
                    </div>
                <span className='span-hoverable-sidebar' onClick={() => {
                    document.getElementById('submenu2')!.style.maxHeight = '80px'
                    document.getElementById('submenu1')!.style.maxHeight = '0'
                    document.getElementById('submenu3')!.style.maxHeight = '0'
                    document.getElementById('submenu4')!.style.maxHeight = '0'
                    document.getElementById('arrow1')!.classList.remove('adown')
                    document.getElementById('arrow2')!.classList.add('adown')
                    document.getElementById('arrow3')!.classList.remove('adown')
                    document.getElementById('arrow4')!.classList.remove('adown')
                }}>
                    <span><label>ПОИСК</label><i id='arrow2' className="arrow down"></i></span>
                    {/*{*/}
                    {/*    activeMenu === 'search' &&*/}
                    {/*    */}
                    {/*}*/}
                </span>
                <div id='submenu2' className='sidebar-submenu'>
                    <li><NavLink className='sidebar-span' to='/search'>Сканирование</NavLink></li>
                    <li><NavLink className='sidebar-span' to='/melt-search'>Поиск</NavLink></li>
                </div>
                <span className='span-hoverable-sidebar' onClick={() => {
                    document.getElementById('submenu3')!.style.maxHeight =
                        (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) ? '80px' : '40px'
                    document.getElementById('submenu1')!.style.maxHeight = '0'
                    document.getElementById('submenu2')!.style.maxHeight = '0'
                    document.getElementById('submenu4')!.style.maxHeight = '0'
                    document.getElementById('arrow1')!.classList.remove('adown')
                    document.getElementById('arrow2')!.classList.remove('adown')
                    document.getElementById('arrow3')!.classList.add('adown')
                    document.getElementById('arrow4')!.classList.remove('adown')
                }}>
                    <span><label htmlFor="">ОТГРУЗКИ</label><i id='arrow3' className="arrow down"></i></span>
                    {/*{*/}
                    {/*    activeMenu === 'dispatch' &&*/}
                    {/*    */}
                    {/*}*/}
                </span>
                <div id='submenu3' className='sidebar-submenu'>
                            {
                                (!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                                <li><NavLink className='sidebar-span' to='/dispatch'>Отгрузка</NavLink></li>
                            }
                    <li><NavLink className='sidebar-span' to='/dispatch-history'>История отгрузок</NavLink></li>
                </div>

                    {/*(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&*/}
                    <span className='span-hoverable-sidebar' onClick={() => {
                        document.getElementById('submenu4')!.style.maxHeight = '120px'
                        document.getElementById('submenu1')!.style.maxHeight = '0'
                        document.getElementById('submenu2')!.style.maxHeight = '0'
                        document.getElementById('submenu3')!.style.maxHeight = '0'
                        document.getElementById('arrow1')!.classList.remove('adown')
                        document.getElementById('arrow2')!.classList.remove('adown')
                        document.getElementById('arrow3')!.classList.remove('adown')
                        document.getElementById('arrow4')!.classList.add('adown')
                    }}>
                        <span><label>ПЕРЕВОЗКА</label><i id='arrow4' className="arrow down"></i></span>

                        {/*{*/}
                        {/*    activeMenu === 'send' &&*/}
                        {/*    */}
                        {/*}*/}
                    </span>
                    <div id='submenu4' className='sidebar-submenu'>
                        <li><NavLink className='sidebar-span' to='/send'>Отправить</NavLink></li>
                        <li><NavLink className='sidebar-span' to='/admission'>Приёмка</NavLink></li>
                        <li><NavLink className='sidebar-span' to='/send-history'>История перевозок</NavLink></li>
                    </div>

            </span>
        </nav>
    )
}