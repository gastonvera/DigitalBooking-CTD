import axios from "axios";
import apiUrl from "../utilities/apiUrl.js";

const baseUrl = apiUrl.urlBaseAws;

const getCities = async () => {
     const endpoint = `${baseUrl}/city/viewAll`;
     return await axios.get(endpoint)
        .then(response => response.data)
        
}
export default getCities;
