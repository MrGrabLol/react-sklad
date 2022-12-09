import {useEffect, useRef, useState} from "react";
import ReactToPrint from "react-to-print";
import {PrintCard} from "../components/PrintCard";
import axios from "axios";

export default function SendPage() {
    let componentRef = useRef(null);
    const [card, setCard] = useState();

    useEffect(() => {
        axios.get('http://localhost:8081/api/v1/search/1', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            const data = res.data
            setCard(data)
        })
    }, [setCard])

    return (
        <div>
            <ReactToPrint
             trigger={() => <button>Print!</button>}
             content={() => componentRef }/>
            <PrintCard ref={el => (componentRef = el)} card={card}  />
        </div>
    )
}