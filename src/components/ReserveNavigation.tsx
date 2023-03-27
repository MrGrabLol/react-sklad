import {NavLink} from "react-router-dom";

interface ReserveNavigationProps {
    setExtendModal: (prop: boolean) => void,
    setCancelModal: (prop: boolean) => void
}

export function ReserveNavigation({setExtendModal, setCancelModal}: ReserveNavigationProps) {
    return (
        <nav>
            <span className='block'>
                <NavLink className='sidebar-btn' to='info'>Информация</NavLink>
                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='dispatch' >Отгрузка</NavLink>
                }
                {(!localStorage.getItem('roles')?.includes('SELLER') || localStorage.getItem('roles')?.includes('ADMIN')) &&
                    <NavLink className='sidebar-btn' to='confirm'>Подтвердить</NavLink>
                }
                <div className='sidebar-btn' onClick={() => setExtendModal(true)}>Продлить</div>
                <div className='sidebar-btn' onClick={() => setCancelModal(true)}>Отменить</div>
            </span>
        </nav>
    )
}