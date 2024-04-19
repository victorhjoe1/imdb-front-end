import { IVotoResponse } from "./iVotoResponse";

export interface Ifilmes {
    id: number,
    nome: string,
    votos: IVotoResponse[],
    mediaVotos: number,
    descricao: string,
    diretor: string,
    genero: string,
    atores: string
}
