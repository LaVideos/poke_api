import {IGetPokeObj} from "./IGetPokeArr.ts";

export interface IAbilityRequest {
    id: number;
    name: string;
    isMainSeries: boolean;
    generation: IGetPokeObj;
    names: {
        language: IGetPokeObj;
        name: string;
    }[];
    effectEntries: {
        effect: string;
        language: IGetPokeObj;
        shortEffect: string;
    }[];
    flavorTextEntries: {
        flavorText: string;
        language: IGetPokeObj;
        versionGroup: {
            name: string;
            url: string;
        };
    }[];
    pokemon: {
        isHidden: boolean;
        pokemon: IGetPokeObj;
        slot: number;
    }[];
}
