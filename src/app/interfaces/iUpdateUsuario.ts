import { IVotoResponse } from "./iVotoResponse";

export interface IUpdateUsuario {
    login: string,
    senha: string,
    cargo:string,
    votos: IVotoResponse[],
}
