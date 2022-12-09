import React from "react";

export class PrintCard extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        }
    }
    render() {
        let card = this.props["card"]
        if (card != undefined) {
            return (
                <div className="card-item">
                    <img src={`http://localhost:8081/api/v1/code/` + card.id} alt={"barcode"}/>
                    <p className="card-item__text"><span>Марка:</span> {card.mark} </p>
                    <p className="card-item__text"><span>Диаметр: {card.diameter}</span></p>
                    <p className="card-item__text"><span>Упаковка:</span> {card.packing}</p>
                    <p className="card-item__text"><span>Партия:</span> {card.part}</p>
                    <p className="card-item__text"><span>Плавка:</span> {card.plav}</p>
                    <p className="card-item__text"><span>Вес:</span> {card.weight}</p>
                    <p className="card-item__text"><span>Статус:</span> {card.status}</p>
                    <p className="card-item__text"><span>Склад:</span> {card.location}</p>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}
