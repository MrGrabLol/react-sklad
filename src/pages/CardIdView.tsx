import {Outlet} from "react-router-dom";
import icon from "../assets/logo_new_v2.png";
import {PositionNavigation} from "../components/PositionNavigation";
import '../css/CardIdView.css'

// @ts-ignore
export function CardIdView() {
    return (
        <div className='container'>
            <div className='sidebar'>
                <img className='image' src={icon} alt="Ферротрейд"/>
                <PositionNavigation/>
            </div>
            <div className='mainbar'>
                <Outlet/>
            </div>
        </div>
    )
}