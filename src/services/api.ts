import axios from 'axios';

export const api= axios.create({
    baseURL: "https://aliceadonismobile.onrender.com",
    headers: {
        Accept: 'application/json'
    }
})