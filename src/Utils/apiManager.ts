import { useEffect } from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface IApiManager {

    setToken(token: string): void;
    get(url: string, params: any): Promise<JSON>;

}

class ApiManager implements IApiManager {
    private axiosInstance: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://fakerestapi.azurewebsites.net/",
        });

        this.axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (this.token && config.headers) {
                    config.headers.Authorization = `Bearer ${this.token}`;
                }
                console.log("Request Config:", config);
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public async get(url: string, params: any): Promise<JSON> {
        try {
            const response = await this.axiosInstance.get(url, params);
            return response.data;
        } catch (error) {
            throw error; // Let the caller handle errors
        }
    }
}

export default ApiManager;

