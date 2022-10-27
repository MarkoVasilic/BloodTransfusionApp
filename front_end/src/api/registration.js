import axiosApi from "./axios";

async function sumbitRegistration(data){
    try{
        const response = await axiosApi.post('/account/register/user/', data)
        console.log(response)
        return response
    }
    catch(err){
        console.log(err)
    }
}

export default sumbitRegistration;