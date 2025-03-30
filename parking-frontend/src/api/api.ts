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

export const updateUser = async (user) => {
    try {
        console.log(user)
        const responce = await axios.post(`${BASE_URL}/user/update`, user);
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}

export const getParkingSpotList = async (user: String) => {
    try {
        const responce = await axios.get(`${BASE_URL}/parking/list`, {
            params: {
                userId: `${user}`
            }
        });
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}


export const addBooking = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/booking/add`, userData);
        console.log(response)
        return response
    } catch (error) {
        throw error;
    }
}

export const changeCarNumberForOwner = async (parking) => {
    try {
        return await axios.post(`${BASE_URL}/parking/update`, parking);
    } catch (error) {
        throw error;
    }
}

export const changeCarNumberForArendator = async (booking) => {
    try {
        return await axios.post(`${BASE_URL}/booking/edit`, booking);
    } catch (error) {
        throw error;
    }
}