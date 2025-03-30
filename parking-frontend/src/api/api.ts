import axios from 'axios';

const BASE_URL = 'http://localhost:8080'


export const loginUser = async (userData) => {
    try {
        console.log(userData)
        const responce = await axios.post(`${BASE_URL}/sso/login`, userData);
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}

export const registerUser = async (userData) => {
    try {
        console.log(userData)
        const responce = await axios.post(`${BASE_URL}/sso/register`, userData);
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        console.log(id)
        const responce = await axios.get(`${BASE_URL}/user/get`, {
            params: {
                userId: `${id}`
            }
        });

        return responce
    } catch (error) {
        throw error;
    }
}

export const getParkingSpotList = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/parking/list`);
        console.log(response)
        return response
    } catch (error) {
        throw error;
    }
}