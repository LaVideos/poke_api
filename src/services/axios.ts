import {baseUrl} from "../constants";
import axios from "axios";
const axiosService = axios.create({baseURL:baseUrl});

export {
    axiosService
}
