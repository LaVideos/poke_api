import {FC} from "react";
import ErrorIcon from "@mui/icons-material/Error"
import styles from "./error.module.css"

interface ErrorProps {
    error: string
}

const ErrorComponent: FC<ErrorProps> = ({error}) => {
    return (
        <div className={styles.errorContainer}>
            <ErrorIcon className={styles.errorIcon}/>
            <div>{error}</div>
        </div>
    );
};

export default ErrorComponent;
