import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../store/actions';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await signin({ email, password });
      dispatch({ type: 'signin', payload: resp });
      window.alert('Signin successfully');
      navigate('/users');
    } catch (error) {
      console.error('Signin error:', error);
      window.alert('signin failed! try again');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signin</button>
    </form>
  );
};

export default Signin;
