import { apiClient } from "./apiClient";


export const getCategoriesApi = async() => {
    return apiClient.get('/categories');
}

export const getProductsByCategoryApi = async(category:string) => {
    return apiClient.get(`/category/${category}`);
}

export const searchProductsApi = async(query:string) => {
    return apiClient.get(`/search?q=${query}`);
}