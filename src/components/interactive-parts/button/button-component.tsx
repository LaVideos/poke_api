import Button from "@mui/material-next/Button";
import styles from "../../poke/pokemons/pokemons.module.css";
import { FC } from "react";

interface ButtonProps {
    disabled?: boolean;
    name: string;
    onClick?: () => void;
}

const ButtonComponent: FC<ButtonProps> = ({ disabled, name, onClick }) => {
    return (
        <span >
            <Button  onClick={onClick} className={styles.btn} disabled={disabled} variant="elevated">
                {name}
            </Button>
        </span>
    );
};

export default ButtonComponent;
