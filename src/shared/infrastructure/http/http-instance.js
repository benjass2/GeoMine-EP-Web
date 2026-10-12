/**
 * @summary Represent instance for HTTP requests.
 * @author Benjamin Solorzano
 */

import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000
});

export const externalHttp = axios.create({
    timeout: 10000
});