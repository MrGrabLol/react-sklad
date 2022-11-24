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
    pack: number
}

export interface Login {
    login: string,
    password: string
}

export interface ResponseBody {
    type: string,
    accessToken : string,
    refreshToken: string
}