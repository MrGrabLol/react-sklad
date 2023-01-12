import {Outlet, useNavigate} from "react-router-dom";
import icon from "../assets/logo_new_v2.png";
import {PositionNavigation} from "../components/PositionNavigation";
import '../css/CardIdView.css'
import {useEffect} from "react";

// @ts-ignore
export function PositionPage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })

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