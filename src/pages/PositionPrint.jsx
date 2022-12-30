
import ReactToPrint from "react-to-print";
import {PrintableCard} from "../components/PrintableCard";
import {useLoaderData} from "react-router-dom";
import {useRef} from "react";
import '../css/PositionPrint.css'

export default function PositionPrint() {
    let cardNoLogo = useRef(null);
    let cardWithLogo = useRef(null);
    const { card } = useLoaderData();

    return (
        <div className={'mainbar_card'}>
            <div className={'logo-card card-print'}>
                <ReactToPrint
                    trigger={() => <button>Печать с лого</button>}
                    content={() => cardNoLogo }/>
                <PrintableCard ref={el => (cardNoLogo = el)} card={card} logo={true}  />
            </div>
            <div className={'no-logo-card card-print'}>
                <ReactToPrint
                    trigger={() => <button>Печать без лого</button>}
                    content={() => cardWithLogo }/>
                <PrintableCard ref={el => (cardWithLogo = el)} card={card} />
            </div>
        </div>
    )
}