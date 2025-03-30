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

export const getParkingSpotList = async (userId: String) => {
    try {
        console.log('Request is: ', userId)
        const responce = await axios.get(`${BASE_URL}/my/parking/list`, {
            params: {
                "filter.ownerId": `${userId}`
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



export const getUserByPhone = async (phone: String) => {
    try {
        const responce = await axios.get(`${BASE_URL}/user/get_by_phone`, {
            params: {
                phoneNumber: `${phone}`
            }
        });
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}


export const getSpotsByOwnerId = async (id: String) => {
    try {
        const responce = await axios.get(`${BASE_URL}/my/parking/list`, {
            params: {
                ownerId: `${id}`
            }
        });
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}

export const changeCarNumberForOwner = async (parking) => {
    console.log("Request is ", parking)
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


export const getRentalBySpotId = async (id: number) => {
    try {
        const responce = await axios.get(`${BASE_URL}/rental/get`, {
            params: {
                ownerId: `${id}`
            }
        });
        console.log(responce)
        return responce
    } catch (error) {
        throw error;
    }
}


export const getAllMyBookings = async (ownerId, timeFrom, timeTo) => {
    try {
        return await axios.get(`${BASE_URL}/booking/list`, {
            params: {
                "filter.ownerId": `${ownerId}`,
                "filter.timeFrom": `${timeFrom}`,
                "filter.timeTo": `${timeTo}`
            }
        });
    } catch (error) {
        throw error;
    }
}

export const getAllOwnedPlaces = async (id) => {
    console.log("Going to send id with UID ", id)
    try {
        return await axios.get(`${BASE_URL}/parking/get_by_user_id`, {
            params: {
                userId: `${id}`
            }
        });
    } catch (error) {
        throw error;
    }
}
