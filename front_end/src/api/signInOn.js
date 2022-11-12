import axiosApi from "./axios";


export async function sumbitRegistration(data, userRole){
        if(userRole === "Admin"){
                const response = await axiosApi.post('/account/register/admin/', data)
                return response     
        }
        else if(userRole === "TranfusionCenterStaff"){
                const response = await axiosApi.post('/account/register/staff/', data)
                return response     
        }
        else{
                const response = await axiosApi.post('/account/register/user/', data)
                return response
        }
}

export async function sumbitLogin(data){
        const response = await axiosApi.post('/login/', data)
        return response
}

