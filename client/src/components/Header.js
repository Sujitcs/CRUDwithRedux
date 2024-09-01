import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <div>
      <nav>
      <ul style={{ display: 'flex', listStyleType: 'none' }}>
          

          {!isAuthenticated ? (
            <>
            
              <li style={{ padding: '10px' }}><Link to="/signin">Sign In</Link></li>
              <li style={{ padding: '10px' }}><Link to="/signup">Sign Up</Link></li>
            </>
          ) : (
            <>
            <li style={{ padding: '10px' }}><Link to="/">Home</Link></li>
          <li style={{ padding: '10px' }}><Link to="/users">User List</Link></li>
            <li style={{ padding: '10px' }}>
              <Link to="/" onClick={handleSignOut}>Logout</Link>
            </li></>
          )}
        </ul>
      </nav>
    </div>
  );
}
