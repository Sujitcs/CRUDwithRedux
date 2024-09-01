import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../App.css';
const url='https://crudwithredux.onrender.com';
const UserList = () => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ firstname: '',lastname:'',email:'',password:'', phone: '' });

  const fetchData = async (token) => {
    try {
      const res = await axios.get(url +'/api/list', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ firstname: user.firstname,
      lastname:user.lastname,
      email:user.email,
      password:user.password,
      phone:user.phone });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(url +`/api/edit/${editingUser._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(token);
      setEditingUser(null);
    } catch (error) {
      console.error('Error update:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(url +`/api/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(token);
    } catch (error) {
      console.error('Error delete:', error);
    }
  };

  return (
    <div>
      <h1>User List:</h1>
      <table>
            <thead>
                <tr>
                    <th>Email Id</th>
                    <th>Password</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Phone no.</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={users._id}>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.phone}</td>
                        
                        <button onClick={() => handleEditClick(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </tr>
                ))}
            </tbody>
        </table>
      

      {editingUser && (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit User:</h2>
          <input
            type="text"
            name="firstname"
            value={editForm.firstname}
            onChange={handleEditChange}
            placeholder="Firstname"
            required
          />
          <input
            type="text"
            name="lastname"
            value={editForm.lastname}
            onChange={handleEditChange}
            placeholder="Lastname"
            required
          />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="phone"
            value={editForm.phone}
            onChange={handleEditChange}
            placeholder="Phone"
            required
          />
          <input
            type="number"
            name="password"
            value={editForm.password}
            onChange={handleEditChange}
            placeholder="password"
            required
          />
          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserList;
