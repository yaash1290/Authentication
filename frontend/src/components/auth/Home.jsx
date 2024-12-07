import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const User = () => {

    const navigate = useNavigate();
        const users = [
            { id: 1, name: "Michael Holz", date: "04/10/2013", role: "Admin", status: "Active" },
            { id: 2, name: "Paula Wilson", date: "05/08/2014", role: "Publisher", status: "Active" },
            { id: 3, name: "Antonio Moreno", date: "11/05/2015", role: "Publisher", status: "Suspended" },
            { id: 4, name: "Mary Saveley", date: "06/09/2016", role: "Reviewer", status: "Active" },
            { id: 5, name: "Martin Sommer", date: "12/08/2017", role: "Moderator", status: "Inactive" },
          ];
        
          const getStatusColor = (status) => {
            switch (status) {
              case "Active":
                
                return "green" ;
                
              case "Suspended":
                return "red";
              case "Inactive":
                return "orange";
              default:
                return "gray";
            }
          };
        
    const [loggedInUser,setLoggedInUser]=useState('');

    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    },[])

    const handleLogout=(e)=>{
     localStorage.removeItem('token')
     localStorage.removeItem('loggedInUser')
     setTimeout(()=>{
        navigate('/login');
     },1000)
    }
          return (
        <>
        <div className='navbar'>
            <div className='heading'>
              <h1>Details</h1>
            </div>
            <div className='logout'>
                <label htmlFor="name">{loggedInUser}</label>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
            <div className="home">
              <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <img
                          src={`https://via.placeholder.com/40?text=${user.name.charAt(0)}`}
                          alt="profile"
                          style={{ borderRadius: "50%", marginRight: "8px" }}
                        />
                        {user.name}
                      </td>
                      <td>{user.date}</td>
                      <td>{user.role}</td>
                      <td style={{ color: getStatusColor(user.status) }}>{user.status}</td>
                      <td>
                        <button style={{ marginRight: "8px" }}>⚙️</button>
                        <button>❌</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </>
          );
    }
     
    export default User

