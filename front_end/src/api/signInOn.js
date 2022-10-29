import axiosApi from "./axios";

export async function sumbitRegistration(data){
        const response = await axiosApi.post('/account/register/user/', data)
        console.log(response)
        return response
}

export async function sumbitLogin(data){
        const response = await axiosApi.post('/login/', data)
        console.log(response)
        return response
}

