export interface IGetPokeObj{
    name: string,
    url: string
}

export interface IGetPokeArr{
    count: number,
    next: string,
    previous: string,
    results: IGetPokeObj[]
}
