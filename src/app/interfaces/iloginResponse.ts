import { IVotoResponse } from "./iVotoResponse"

export interface IloginResponse {
    id: string
    token: string,
    cargo: string,
    votos: IVotoResponse[]
}
