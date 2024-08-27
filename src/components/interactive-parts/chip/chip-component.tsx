import {Chip} from "@mui/material";
import {FC} from "react";

interface ChipProps{
    text:string
}

const ChipComponent:FC<ChipProps> = ({text}) => {
    return (
        <Chip label={text} clickable />
    );
};

export default ChipComponent;
