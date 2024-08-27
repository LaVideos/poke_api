import styles from "./stats.module.css";
import {IStats} from "../../../interfaces/IPoke.ts";
import {FC} from "react";


interface StatsProps{
    stats:IStats
}

const StatsComponent:FC<StatsProps> = ({stats}) => {
    return (
        <div className={styles.statContainer}>
            <span className={styles.stat}>{stats.stat.name.toUpperCase()}:</span>

            <span className={styles.statRes}>&nbsp;{`${stats.base_stat}`}</span>
        </div>
    );
};

export default StatsComponent;
