import axiosApi from '../api/axios';
 
export const setAuthToken = token => {
   if (token) {
        axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(axiosApi.defaults.headers.common);
   }
   else
       delete axiosApi.defaults.headers.common["Authorization"];
}