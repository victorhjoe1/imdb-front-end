import { IVotoResponse } from "./iVotoResponse";

export interface IfilmesRequest {
    nome: string,
    votos: IVotoResponse[],
    descricao: string,
    diretor: string,
    genero: string,
    atores: string
}
