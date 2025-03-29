import axios from 'axios';

export const loginUser = async (userData) => {
    console.log("Login operation")
    // This is a stub implementation that returns a mock response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    phone: userData.phone
                }
            });
        }, 100); // Simulate network delay
    });
}

export const registerUser = async (userData) => {
    console.log("Register operation")
}