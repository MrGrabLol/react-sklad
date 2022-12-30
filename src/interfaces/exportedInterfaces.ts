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
    date: string,
    manufacturer: string,
    type: string,
    mark: string,
    diameter: string,
    packing: string,
    part: string,
    plav: string,
    weight: string,
    comment: string,
    status: string,
    location: string,
    createdFrom: string,
    pack: number,
    positions: IModelsCardPackage[]
}

export interface IModelsCardPackage {
    id: number,
    date: string,
    manufacturer: string,
    type: string,
    mark: string,
    diameter: string,
    packing: string,
    part: string,
    plav: string,
    weight: string,
    comment: string,
    status: string,
    location: string,
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