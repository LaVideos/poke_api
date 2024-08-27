import {IForms} from "../../../interfaces/IPoke.ts";
import {FC} from "react";
import {Link} from "react-router-dom";
import {ButtonComponent} from "../../index.ts";
import {ENDPOINTS} from "../../../constants";

interface PokemonFormsComponentProps{
    forms:IForms
}

const PokemonFormsComponent:FC<PokemonFormsComponentProps> = ({forms}) => {

    return (
        <>
            <Link to={`/${ENDPOINTS.FORM}/${forms.name}`} state={forms}><ButtonComponent name={"Go to forms"}></ButtonComponent></Link>
        </>
    );
};

export default PokemonFormsComponent;
