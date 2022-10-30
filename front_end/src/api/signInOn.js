import axiosApi from "./axios";

export async function sumbitRegistration(data, userRole){
        console.log("USER ROLE", userRole, data);
        if(userRole === "Admin"){
                const response = await axiosApi.post('/account/register/admin/', data)
                console.log(response)
                return response     
        }
        else{
        const response = await axiosApi.post('/account/register/user/', data)
        console.log(response)
        return response
        }
}

export async function sumbitLogin(data){
        const response = await axiosApi.post('/login/', data)
        console.log(response)
        return response
}

