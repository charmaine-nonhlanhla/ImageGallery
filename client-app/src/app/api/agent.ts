import axios, { AxiosResponse } from "axios";
import { Image } from "../layout/models/image";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL= 'http://localhost:5000/api'

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then( responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then( responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then( responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then( responseBody),
}

const Images = {
    list: () => requests.get<Image[]>('/images'),
    details: (id: string) => requests.get<Image>(`/images/${id}`),
    create: (image: Image) => axios.post('/images', image),
    update: (image: Image) => axios.put(`/images/${image.imageId}`, image),
    delete: (id: string) => axios.delete<void>(`/images/${id}`)
}

const agent = {
    Images
}

export default agent;