import {Card} from "../components/Card";
import {IModelsCard} from "../interfaces/models";
import {useLoaderData} from "react-router-dom";
import axios from "axios";
import icon from "../assets/logo_new_v2.png";
import {PositionNavigation} from "../components/PositionNavigation";

// @ts-ignore
export async function loader({ params }) {
    let card;
    await axios.get<IModelsCard>('http://localhost:8081/api/v1/search/' + params.id, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
        }}).then(response => card = response.data);
    return { card }
}

export function CardIdView() {

    // @ts-ignore
    const { card } = useLoaderData();

    return (
        <div className='container'>
            <div className='sidebar'>
                <img className='image' src={icon} alt="Ферротрейд"/>
                <PositionNavigation/>
            </div>
            <div className='mainbar'>
                <Card card={card}/>
            </div>
        </div>
    )
}