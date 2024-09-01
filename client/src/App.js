import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import UserList from './components/UserList';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthenticated from './components/Unauthenticated';
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<h1>Welcome to Home Page</h1>} />}/>
        <Route path="/signup" element={<Unauthenticated element={<Signup />} />}/>
        <Route path="/signin" element={<Unauthenticated element={<Signin />} />}/>
        <Route path="/users"  element={<ProtectedRoute element={<UserList />} />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
