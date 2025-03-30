import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

// export const loginUser = async (userData) => {
//     console.log("Login operation")
//     // This is a stub implementation that returns a mock response
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 status: 200,
//                 data: {
//                     phone: userData.phone
//                 }
//             });
//         }, 100); // Simulate network delay
//     });
// }
//
// export const registerUser = async (userData) => {
//     console.log("Register operation")
// }

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
        const responce = await axios.get(`${BASE_URL}/sso/get/user?userId=${id}`);
        console.log(responce)
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