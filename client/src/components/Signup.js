import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const url='https://crudwithredux.onrender.com';
const Signup = () => {
  const [firstname, setFirstame] = useState('');
  const [lastname, setLastame] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url +'/api/signup', { email, password, firstname,lastname, phone });
      dispatch({ type: 'signup', payload: res.data });
      window.alert('Form submit successfully');
            setFirstame('');
            setLastame('');
            setPhone('');
            setEmail('');
            setPassword('')
    } catch (error) {
      console.error('Signup error:', error);
      window.alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={firstname} onChange={(e) => setFirstame(e.target.value)} placeholder="First name" required />
      <input type="text" value={lastname} onChange={(e) => setLastame(e.target.value)} placeholder="Last name" required />
      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
