export interface IModels {
    mark: string,
    diameter: string,
    packing: string,
    manufacture: string,
    solnechnogorsk: string,
    belSklad: string
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
    diameter: string,
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

// export interface IShipmentPackage {
//     id: number,
//     mark: string,
//     diameter: string,
//     date: string,
//     packing: string,
//     comment: string,
//     part: string,
//     plav: string,
//     manufacturer: string,
//     weight: string,
//     status: string,
//     location: string,
//     type: string,
//     standards: string[],
//     positions: IPositionsResponse[]
// }

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