export interface IAbility{
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}

interface IIndices{
    game_index: number,
    version: {
        name: string,
        url: string
    }
}

export interface IForms{
    name: string,
    url: string
}

interface IVersionDetails{
    rarity: number,
    version: {
        name: string,
        url: string
    }
}




export interface ITypes{
    slot: number,
    type: IType
}

export interface IType{
    name: string,
    url: string
}

interface IHeldItems{
    item: {
        name: string,
        url: string
    },
    version_details: IVersionDetails[]
}

export interface IVersionGroupDetails{
    level_learned_at: number,
    move_learn_method: {
        name: string,
        url: string
    },
    version_group: {
        name: string,
        url: string
    }
}

export interface IStats{
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

export interface IPoke{
    abilities: IAbility[],
    base_experience: number,
    forms: IForms[],
    game_indices: IIndices[],
    height: number,
    held_items: IHeldItems[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: [
        {
            move: {
                name: string,
                url: string
            },
            version_group_details: IVersionGroupDetails[]
        }
    ],
    name: string,
    order: number,
    past_types: [],
    species: {
        name: string,
        url: string
    },
    sprites:any,
    stats: IStats[],
    types:ITypes[],
    weight: number,
}
