import {Link} from "react-router-dom";

interface ReserveNavigationProps {
    setExtendModal: (prop: boolean) => void,
    setCancelModal: (prop: boolean) => void
}

export function ReserveNavigation({setExtendModal, setCancelModal}: ReserveNavigationProps) {
    return (
        <nav>
            <span className='block'>
                <Link className='sidebar-btn' to=''>Информация</Link>
                <Link className='sidebar-btn' to='dispatch' >Отгрузка</Link>
                <Link className='sidebar-btn' to='confirm'>Подтвердить</Link>
                <div className='sidebar-btn' onClick={() => setExtendModal(true)}>Продлить</div>
                <div className='sidebar-btn' onClick={() => setCancelModal(true)}>Отменить</div>
            </span>
        </nav>
    )
}