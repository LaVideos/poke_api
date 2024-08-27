import {axiosService} from "./axios";
import {ENDPOINTS} from "../constants";

export const pokemonService = {
    getPokemons: async (url: string) => await axiosService.get(url),
    getPokemonByUrl: async (url: string) => axiosService.get(url),
    getPokemonByName: async (name: string) => axiosService.get(`${ENDPOINTS.POKEMON}/${name}`),
    getPokemonByType: async (type: string) => axiosService.get(`${ENDPOINTS.TYPE}/${type}`),
    getPokemonByAbility: async (ability: string) => axiosService.get(`${ENDPOINTS.ABILITY}/${ability}`),
    getPokemonTypes: async () => axiosService.get(`${ENDPOINTS.TYPE}/?${ENDPOINTS.LIMIT}=21`),
    getPokemonAbility: async () => axiosService.get(`${ENDPOINTS.ABILITY}/?${ENDPOINTS.LIMIT}=367`),
    getPokemonFormBuUrl:async (url:string)=>axiosService.get(url)
};
