import axios from 'axios';
const url='https://crudwithredux.onrender.com';
export const signup =async (userData) => {
  try {
    const res=axios.post(url +'/api/signup', userData)
    return res.data;
  } catch (error) { 
  }    
};

export const signin =async (userData) => {
  try {
    const res= await axios.post(url +'/api/signin', userData);
    return res.data
  } catch (error) {
    
  }
};

export const fetchUsers = async (token) => {
  try {
    const res= await axios.get(url +'/api/list', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    
  } catch (error) {
    
  }  
};

export const logout = () => {
  return { type: 'logout' };
};
