
const BASE_URL = 'http://192.168.100.12:3000';


export const API = {
 
  USER: {
    SIGNUP: `${BASE_URL}/auth/sign-up`,
    LOGIN: `${BASE_URL}/auth/login`,
    C_PROFILE: `${BASE_URL}/auth/create-profile`,
    Add_Inter: `${BASE_URL}/auth/add-interests`,
    PROFILE_DATA :`${BASE_URL}/auth/get-profile`,
    UPDATE_DATA :`${BASE_URL}/auth/update-profile`,
    // UPDATE_DATA :`${BASE_URL}/test`,
  },
};