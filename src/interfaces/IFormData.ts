interface IType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

interface ISprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

interface IPokemon {
    name: string;
    url: string;
}

interface IVersionGroup {
    name: string;
    url: string;
}

export interface IFormData {
    form_name: string;
    form_names: string[];
    form_order: number;
    id: number;
    is_battle_only: boolean;
    is_default: boolean;
    is_mega: boolean;
    name: string;
    names: string[];
    order: number;
    pokemon: IPokemon;
    sprites: ISprites;
    types: IType[];
    version_group: IVersionGroup;
}
