import exp from "constants";

export interface IModels {
    mark: string,
    diameter: string,
    packing: string,
    manufacture: string,
    solnechnogorsk: string,
    belSklad: string,
    manufactureReserve: string,
    solnechnogorskReserve: string,
    belSkladReserve: string
}

export interface IModelsCard {
    id: number,
    mark: string,
    diameter: string,
    packing: string,
    date: string,
    comment: string,
    part: string,
    plav: string,
    manufacturer: string,
    weight: string,
    status: string,
    location: string,
    type: string,
    standards: string[]
    createdFrom: string,
    pack: number,
    positions: IModelsCardForPackage[]
}

export interface IModelsCardForPackage {
    id: number,
    mark: string,
    diameter: string,
    packing: string,
    date: string,
    comment: string,
    part: string,
    plav: string,
    manufacturer: string,
    weight: string,
    status: string,
    location: string,
    type: string,
    standards: string[]
    createdFrom: string,
    pack: number
}

export interface Diameter {
    min: number,
    max: number
}

export interface ISearchModels {
    mark: string,
    diameter: string,
    pack: string,
    manufacture: string,
    solnechnogorsk: string,
    belSklad: string,
    part: string,
    plav: string
}

export interface ISearchAutoComplete {
    activeSuggestion: number,
    markSuggestions: Array<string>,
    partSuggestions: Array<string>,
    heatSuggestions : Array<string>,
    showSuggestions: boolean,
    userInput: string
}

export interface SearchAutocompleteResponse {
    marks: Array<string>,
    plav: Array<string>,
    part: Array<string>
}

export interface IPositionModel {
    mark: string,
    diameter: number,
    packing: string,
    plav: string,
    part: string,
    comment: string,
    manufacturer: string,
    weight: number,
    standard: {
        mark: string,
        standards: string[]
    }
}

export interface IRegisterModel {
    positions: IPositionModel[],
    pack: boolean
}

export interface IStandards {
    mark: string,
    standards: string[]
}

export interface IStandardsRequest {
    marks: IStandards[]
}

export interface IPositionsResponse {
    id: number,
    mark: string,
    diameter: string,
    packing: string,
    date: string,
    comment: string,
    part: string,
    plav: string,
    manufacturer: string,
    weight: string,
    status: string,
    location: string,
    type: string,
    standards: string[],
    createdFrom: string,
    pack: number
}

export interface IPackResponse {
    id: number,
    mark: string,
    diameter: string,
    packing: string,
    date: string,
    comment: string,
    part: string,
    plav: string,
    manufacturer: string,
    weight: string,
    status: string,
    location: string,
    type: string,
    standards: string[],
    positions: IPositionsResponse[]
}

export interface IRegisterResponse {
    positions: IPositionsResponse[],
    pack: IPackResponse
}

export interface IShipmentResponse {
    packages: IPackResponse[],
    positions: IPositionsResponse[]
}

export interface IShipping {
    id: number,
    weight: number
}

export interface ISecondStepShipping {
    positions: IShipping[],
    bill: string,
    customer: string
}

export interface IThirdStepShipping {
    print: IPositionsResponse[],
    new: IPositionsResponse[]
}

export interface IShippingHistory {
    id: number,
    customer: string,
    bill: string,
    weight: number,
    date: string
}

export interface IReserve {
    id: number,
    mark: string,
    diameter: string,
    packing: string,
    part: string,
    weight: number,
    days: number,
    customer: string,
    bill: string,
    comment: string,
    creationDate: string,
    dueDate: string,
    positions: IPositionsResponse[],
    location: string,
    status: string,
    worker: string
}

export interface IWorker {
    roles: string[],
    name: string,
    lastName: string,
}

export interface ISendHistoryFields {
    id: number,
    source: string,
    destination: string,
    createdDate: string,
    creator: string,
    carPlate: string,
    status: string,
    positions: IPositionsResponse[]
}

export interface ISendHistory {
    transfers: ISendHistoryFields[]
}

export interface IAlloy {
    minDiameter: number,
    maxDiameter: number,
    id: number
}

export interface IReceivedAlloy {
    name: string,
    alloys: IAlloy[]
}

export interface IComposition {
    element: string,
    value: number
}