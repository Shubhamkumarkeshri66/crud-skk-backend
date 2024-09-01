import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({
    stu_id: "",
    name: "",
    email: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getData");
      setData(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("data not fetched");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading.......</h1>;
  }
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteData/${userId}`
      );
      console.log(response);
      if (response) {
        fetchData();
      }
    } catch (error) {
      console.error("Error during Deleting data:", error.message);
    }
  };
  const handleEditClick = (user) => {
    setIsEditing(true);
    setEditUser({ stu_id: user.stu_id, name: user.name, email: user.email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/updateData/${editUser.stu_id}`,
        editUser
      );
      console.log(response);
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.error("Error during Updating data:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Fetched Data</h1>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.stu_id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="btn1">
                  <button onClick={() => handleDelete(user.stu_id)}>
                    Delete
                  </button>{" "}
                  <button
                    variant="danger"
                    onClick={() => handleEditClick(user)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No User Found</h1>
      )}

{isEditing && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <input
            type="text"
            name="name"
            value={editUser.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
    
  );
};



export default Dashboard;
