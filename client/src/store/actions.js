import axios from 'axios';
export const signup =async (userData) => {
  try {
    const res=axios.post('http://localhost:5000/api/signup', userData)
    return res.data;
  } catch (error) { 
  }    
};

export const signin =async (userData) => {
  try {
    const res= await axios.post('http://localhost:5000/api/signin', userData);
    return res.data
  } catch (error) {
    
  }
};

export const fetchUsers = async (token) => {
  try {
    const res= await axios.get('http://localhost:5000/api/list', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
    
  } catch (error) {
    
  }  
};

export const logout = () => {
  return { type: 'logout' };
};
