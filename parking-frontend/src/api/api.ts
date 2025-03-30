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

export const getMyParkingList = async (id) => {
    try {
        // let resp = await axios.get(`${BASE_URL}/user/get`, {
        //     params: {
        //         userId: `${id}`
        //     }
        // })
        //
        let resp = {
            data: {
                "bookings": [
                    {
                        "userId": id,
                        "parkingLot": "string",
                        "vehicle": "string",
                        "timeFrom": "2025-03-30T05:38:26.175Z",
                        "timeTo": "2025-03-30T05:38:26.175Z"
                    }
                ],
                "rentals": [
                    {
                        "rentalId": "string",
                        "parkingLot": "string",
                        "timeFrom": "2025-03-30T05:38:26.175Z",
                        "timeTo": "2025-03-30T05:38:26.175Z",
                        "costPerHour": "string",
                        "costPerDay": "string"
                    }
                ],
                "parkingLots": [
                    {
                        "number": "string",
                        "kind": "UNDEFINED_PARKING_KIND",
                        "type": "UNDEFINED_PARKING_TYPE",
                        "status": "UNDEFINED_PARKING_LOT_STATUS",
                        "vehicle": "string",
                        "ownerId": id
                    }
                ],
                "total": "3"
            }
        }
        return resp
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