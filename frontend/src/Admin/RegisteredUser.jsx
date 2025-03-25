import React, { useState, useEffect } from "react";
import "./AdminCss/RegisteredUser.css";
import Nav from "./Nav";

const RegisteredUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  // const fetchUsers = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/users");
  //     const data = await res.json();
  //     console.log("Fetched Users:", data); // Debug line
  //     setUsers(data);
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //     setUsers([]); // fallback to avoid breaking .map()
  //   }
  // };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setUsers(data); // users is already an array
      } else {
        alert(data.message || "Unauthorized");
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     try {
  //       const res = await fetch(`http://localhost:5000/api/users/${id}`, {
  //         method: "DELETE",
  //       });
  //       const result = await res.json();
  //       alert(result.message);
  //       fetchUsers(); // Refresh list
  //     } catch (err) {
  //       console.error("Error deleting user:", err);
  //     }
  //   }
  // };



  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = await res.json();
        if (res.ok) {
          alert(result.message);
          fetchUsers(); // Refresh list
        } else {
          alert(result.message || "Error deleting user");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };
  

  // Export table to CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = ["Name", "Email", "Mobile", "Password"];
    csvRows.push(headers.join(","));

    users.forEach((user) => {
      const row = [user.name, user.email, user.mobile, user.password];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registered_users.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="registered-users-container">
      <Nav />
      <div className="header">
        <h2>Registered Users</h2>
        <button onClick={exportToCSV} className="export-btn">Export as CSV</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.password}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUser;
