import axios from "../../../node_modules/axios/index";


 export const FetchUserData=async()=> {
  try {
    const response = await axios.get('https://api.github.com/users');
        return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

